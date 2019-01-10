export default function colority(imageURL: string, callback: (colors: []) => void, options?: {
    skip: number
}) {
    if (!(this instanceof colority)) return new colority(imageURL, callback, options);

    this.imageURL = imageURL;
    this.options = {};
    this.callback = () => {};

    if (options === undefined) {
        this.callback = callback;
    } else {
        this.options = callback;
        this.callback = options;
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

function preload(imageURL: string, done: (image: HTMLImageElement) => void) {
    const image: HTMLImageElement = new Image();
    image.crossOrigin = '*';
    image.src = imageURL;
    image.addEventListener('load', () => done(image));
    image.addEventListener('error', () => done(image));
}

function getContext(width: number, height: number): CanvasRenderingContext2D {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext('2d');
}

function transformColors(data: Uint8ClampedArray, skip: number, callback: (color: string) => void) {
    for (let i = 0; i < data.length; i += 4 * skip) {
        callback(`rgb(${data[i]},${data[i + 1]},${data[i + 2]})`);
    }
}

function mapColors(data: object, callback: (key: string, value: any) => void) {
    for (let key in data) {
        callback(key, data[key]);
    }
}
