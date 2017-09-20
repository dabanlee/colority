<p align="center" style="font-size: 100px;">🎨</p>

<h1 align="center">colority</h1>

<p align="center">
    <a href="javascript:;">
        <img src="https://api.travis-ci.org/JustClear/colority.svg?branch=master" alt="travis">
    </a>
    <a href="https://david-dm.org/justclear/colority#info=dependencies&view=table">
        <img src="https://david-dm.org/justclear/colority.svg" alt="dependencies">
    </a>
    <a href="https://david-dm.org/justclear/colority#info=devDependencies&view=table">
        <img src="https://david-dm.org/justclear/colority/dev-status.svg" alt="devDependencies">
    </a>
</p>

<p align="center">extracting colors from pictures.</p>

## Installation

```sh
$ yarn add colority
```

## Usage

[DEMO](https://justclear.github.io/colority/demo/?image=https://user-gold-cdn.xitu.io/2017/8/8/c5267eadfded82a98cd3cad7a16d5a48?imageView2/1/w/1200/h/700/q/85/interlace/1)

```js
import colority from 'colority';

colority(imageURL, colors => {
    // do something here...
});

// or skip pixels

colority(imageURL, {
    skip: 1000,
}, colors => {
    // do something here...
});
```

## APIs

- `colority(imageURL[, options], colors => {})`
    - `imageURL`: picture url.
    - `options.skip`: skip pixels(Optional, default to `10`).
    - `colors`: the extracted `rgb` colors(Sort by quantity).

## License

Licensed under the [MIT License](https://github.com/JustClear/just-sketch/blob/master/LICENSE)
