import { preload, getContext, transformColors, mapColors } from './common';

export default function colority() {
    if (!(this instanceof colority)) return new colority(...arguments);

    const argument = [...arguments];
    this.imageURL = ``;
    this.options = {};
    this.callback = () => {};

    if (typeof argument[0] === 'string') {
        this.imageURL = argument[0];
        if (typeof argument[2] === 'function') {
            this.callback = argument[2];
            this.options = typeof argument[1] == 'object' ? argument[1] : this.options;
        } else {
            this.callback = typeof argument[1] == 'function' ? argument[1] : this.callback;
        }
    } else {
        console.log(`first param in "colority()" must be string.`);
    }

    preload(this.imageURL, ([image]) => {
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
