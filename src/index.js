export default function colority(imageURL, options, callback) {
    if (!(this instanceof colority)) return new colority(imageURL, options, callback);

    this.imageURL = imageURL;
    this.options = {};
    this.callback = () => {};

    if (callback === undefined) {
        this.callback = options;
    } else {
        this.options = options;
        this.callback = callback;
    }

    preload(this.imageURL, image => {
        const context = getContext(image.naturalWidth, image.naturalHeight);
        context.drawImage(image, 0, 0);
        const imageData = context.getImageData(0, 0, image.naturalWidth, image.naturalHeight).data;
        const colors = {};
        const results = [];

        transformColors(imageData, this.options.skip || 10, rgb => colors[rgb] = rgb in colors ? colors[rgb] + 1 : 1);
        mapColors(colors, (key, value) => {
            results.push({
                color: key,
                count: value,
            });
        });
        this.callback(results.sort((a, b) => b.count - a.count).map(result => result.color));
    });
}

function preload(imageURL, done) {
    const image = new Image();
    image.crossOrigin = '*';
    image.src = imageURL;
    image.addEventListener('load', () => done(image));
    image.addEventListener('error', () => done(image));
}

function getContext(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext('2d');
}

function transformColors(data, skip, callback) {
    for (let i = 0; i < data.length; i += 4 * skip) {
        callback(`rgb(${data[i]},${data[i + 1]},${data[i + 2]})`);
    }
}

function mapColors(data, callback) {
    for (let key in data) {
        callback(key, data[key]);
    }
}
