export function preload(imageURLs, done) {
    const images = [];
    let count = 0;
    imageURLs = (typeof imageURLs != 'object') ? [imageURLs] : imageURLs;

    imageURLs.length === 0 && done(images);

    imageURLs.map(imageURL => {
        const image = new Image();
        image.crossOrigin = '*';
        image.src = imageURL;
        image.addEventListener('load', imageOnLoad);
        image.addEventListener('error', imageOnLoad);
        images.push(image);
    });

    function imageOnLoad() {
        count ++;
        if (count == imageURLs.length) done(images);
    }
}

export function getContext(width = 0, height = 0) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext('2d');
}

export function transformColors(data, skip, callback) {
    for (let i = 0; i < data.length; i += 4 * skip) {
        callback(`rgb(${data[i]},${data[i + 1]},${data[i + 2]})`);
    }
}

export function mapColors(data, callback) {
    for (let key in data) {
        callback(key, data[key]);
    }
}
