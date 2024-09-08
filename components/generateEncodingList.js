// For EncodingDropdownOptions.ts
const https = require('https');
const {Buffer} = require('buffer');

function getList() {
	return new Promise((resolve) => {
		const buffers = [];
		https.get('https://encoding.spec.whatwg.org/encodings.json', (res) => {
			res.on('data', buffers.push.bind(buffers));
			res.on('end', () => {resolve(JSON.parse(Buffer.concat(buffers).toString()))});
		});
	});
}

async function main() {
	const list = await getList();
	const encodings = [];

	for (const group of list) {
		for (const encoding of group.encodings) {
			encodings.push(encoding.name);
		}
	}
	encodings.sort();

	const dropdownOptions = [];
	for (const encoding of encodings) {
		dropdownOptions.push(encoding);
	}

	process.stdout.write(JSON.stringify(dropdownOptions, null, 4) + '\n');
	// Copy output to ExportTypeDropdown.ts, then manually add common aliases
}

main();
