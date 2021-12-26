'use strict';
const execa = require('execa');
const gifsicle = require('gifsicle');

module.exports = opts => stream => {
	opts = Object.assign({
		resize_method: "lanczos3",
		optimizationLevel: 2,
		timeout: 0
	}, opts);

	const args = ['--no-warnings', '--no-app-extensions'];

	if (opts.interlaced) {
		args.push('--interlace');
	}

	if (opts.optimizationLevel) {
		args.push(`--optimize=${opts.optimizationLevel}`);
	}

	if (opts.colors) {
		args.push(`--colors=${opts.colors}`);
	}

	if (opts.lossy) {
		args.push(`--lossy=${opts.lossy}`);
	}

	if (opts.resize_method) {
		args.push(`--resize-method=${opts.resize_method}`);
	}

	if (opts.gamma) {
		args.push(`--gamma=${opts.gamma}`);
	}

	if (opts.crop) {
		args.push(`--crop=${opts.crop[0]},${opts.crop[1]}+${opts.crop[2]}x${opts.crop[3]}`);
	}

	if (opts.flip_h) {
		args.push(`--flip-horizontal`);
	}

	if (opts.flip_v) {
		args.push(`--flip-vertical`);
	}

	if (opts.rotate) {
		if(opts.rotate == 90) args.push(`--rotate-90`);
		if(opts.rotate == 180) args.push(`--rotate-180`);
		if(opts.rotate == 270) args.push(`--rotate-270`);
	}

	if(opts.width){
		if(!opts.stretch){
			args.push(`--resize-fit-width=${opts.width}`);
		} else {
			args.push(`--resize-width=${opts.width}`);
		}
	}

	if(opts.height){
		if(!opts.stretch){
			args.push(`--resize-fit-height=${opts.height}`);
		} else {
			args.push(`--resize-height=${opts.height}`);
		}
	}

	if(opts.scale) {
		args.push(`--scale=${opts.scale}x${opts.scale}`)
	}

	args.push('--output', "-");

	return execa(gifsicle, args, {input: stream, encoding: null, buffer: false, timeout: opts.timeout});
};
