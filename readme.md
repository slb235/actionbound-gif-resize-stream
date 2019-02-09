# gif-resize [![Build Status](https://travis-ci.org/gumlet/gif-resize.svg?branch=master)](https://travis-ci.org/gumlet/gif-resize)

> Nodejs plugin for [Gifsicle](https://www.lcdf.org/gifsicle/)


## Install

```
$ npm install gif-resize
```


## Usage

```js
const imagemin = require('imagemin');
const imageminGifsicle = require('imagemin-gifsicle');

(async () => {
	await imagemin(['images/*.gif'], 'build/images', {
		use: [
			imageminGifsicle()
		]
	});

	console.log('Images optimized');
})();
```


## API

### imageminGifsicle([options])(buffer)

Returns a promise for a buffer.

#### options

Type: `Object`

##### interlaced

Type: `boolean`<br>
Default: `false`

Interlace gif for progressive rendering.

##### optimizationLevel

Type: `number`<br>
Default: `1`

Select an optimization level between `1` and `3`.

> The optimization level determines how much optimization is done; higher levels take longer, but may have better results.

1. Stores only the changed portion of each image.
2. Also uses transparency to shrink the file further.
3. Try several optimization methods (usually slower, sometimes better results)

##### colors

Type: `number`

Reduce the number of distinct colors in each output GIF to num or less. Num must be between 2 and 256.

#### buffer

Type: `Buffer`

Buffer to optimize.


## License

MIT © [imagemin](https://github.com/imagemin)
