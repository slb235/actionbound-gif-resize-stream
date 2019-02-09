const fs = require("fs"),
	path = require("path"),
	isGif = require("is-gif"),
	imageminGifsicle = require("../src/index");

test('Buffer', async () => {
	fs.readFile(path.join(__dirname, 'fixture.gif'), async function(err, buf){
		const data = await imageminGifsicle()(buf);
		expect(data.length).toBeLessThan(buf.length);
		expect(isGif(data)).toBe(true);
	});
});

test('Buffer - non-binary', async () => {
	const buf = Buffer.from('string');
	const data = await imageminGifsicle()(buf);
	expect(data.toString()).toBe("string");
});
