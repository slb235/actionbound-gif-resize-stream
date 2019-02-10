const fs = require("fs"),
  path = require("path"),
  isGif = require("is-gif"),
  crypto = require("crypto"),
  gifResize = require("../src/index");

const {
  promisify
} = require('util');
const readFileAsync = promisify(fs.readFile);


test('Default optimize', async () => {
  let buf = await readFileAsync(__dirname + '/test_images/avocado.gif');
  const data = await gifResize()(buf);
  expect(data.length).toBeLessThan(buf.length);
  expect(isGif(data)).toBe(true);
});

test('resize width to 300 px', async () => {
  let buf = await readFileAsync(__dirname + '/test_images/avocado.gif');
  const data = await gifResize({
    width: 300
  })(buf);
  expect(md5(data)).toBe(md5(await readFileAsync(__dirname + "/test_images/avocado_300.gif")));
});

test('resize height to 300 px', async () => {
  let buf = await readFileAsync(__dirname + '/test_images/avocado.gif');
  const data = await gifResize({
    height: 300
  })(buf);
  expect(md5(data)).toBe(md5(await readFileAsync(__dirname + "/test_images/avocado_300.gif")));
});

test('crop image', async () => {
	let buf = await readFileAsync(__dirname + '/test_images/avocado.gif');
	const data = await gifResize({
		crop: [200, 300, 100, 100]
  })(buf);
	expect(md5(data)).toBe(md5(await readFileAsync(__dirname + "/test_images/avocado_crop.gif")));
});

test('flip horizontally', async () => {
	let buf = await readFileAsync(__dirname + '/test_images/avocado.gif');
	const data = await gifResize({
		flip_h: true
  })(buf);
	expect(md5(data)).toBe(md5(await readFileAsync(__dirname + "/test_images/avocado_flip_h.gif")));
	// fs.writeFileSync(__dirname + '/test_images/avocado_flip_h.gif', data);
});

test('flip vertically', async () => {
	let buf = await readFileAsync(__dirname + '/test_images/avocado.gif');
	const data = await gifResize({
		flip_v: true
  })(buf);
	expect(md5(data)).toBe(md5(await readFileAsync(__dirname + "/test_images/avocado_flip_v.gif")));
});

test('Interlaced output', async () => {
	let buf = await readFileAsync(__dirname + '/test_images/avocado.gif');
	const data = await gifResize({
    interlaced: true
  })(buf);
	expect(md5(data)).toBe(md5(await readFileAsync(__dirname + "/test_images/avocado_interlaced.gif")));
});

test('rotate', async () => {
	let buf = await readFileAsync(__dirname + '/test_images/avocado.gif');
	const data = await gifResize({
    rotate: 90
  })(buf);
});


test('reduce colors', async () => {
	let buf = await readFileAsync(__dirname + '/test_images/avocado.gif');
	const data = await gifResize({
    colors: 100
  })(buf);
});

test('change resize method', async () => {
	let buf = await readFileAsync(__dirname + '/test_images/avocado.gif');
	const data = await gifResize({
		resize_method: "mix",
    width: 200
  })(buf);
});

test('gamma correction applied', async () => {
	let buf = await readFileAsync(__dirname + '/test_images/avocado.gif');
	const data = await gifResize({
		gamma: 2.2,
    width: 200
  })(buf);
});

test('Non-binary buffer is returned as is', async () => {
  const buf = Buffer.from('string');
  const data = await gifResize()(buf);
  expect(data.toString()).toBe("string");
});

test('throws error when wrong parameter passed', async () => {
	let buf = await readFileAsync(__dirname + '/test_images/avocado.gif');

  expect(gifResize({
    width: "simple"
  })(buf)).rejects.toThrowError(/‘--resize-fit-width’ expects a nonnegative integer/);
});

test('throws error when non-buffer is passed', async () => {
  expect(gifResize({
    width: "simple"
  })("only_string")).rejects.toThrowError(/Expected a buffer/);
});


function md5(string) {
  return crypto.createHash('md5').update(string).digest('hex');
}
