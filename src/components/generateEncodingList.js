// For EncodingDropdownOptions.ts
const https = require('https');
const {Buffer} = require('buffer');

function getList() {
    return new Promise((resolve) => {
        const buffers = [];
        https.get('https://encoding.spec.whatwg.org/encodings.json', (res) => {
            res.on('data', buffers.push.bind(buffers));
            res.on('end', () => {resolve(JSON.parse(Buffer.concat(buffers)))});
        });
    });
}

async function main() {
    const list = await getList();
    const encodings = [];
    const addToTop = ['UTF-8', 'UTF-16LE'];

    for (const group of list) {
        for (const encoding of group.encodings) {
            encodings.push(encoding.name);
        }
    }
    encodings.sort();

    const dropdownOptions = [{key: '', text: 'Auto-detect'}];
    for (const encoding of [...addToTop, ...encodings]) {
        dropdownOptions.push({key: encoding, text: encoding});
    }

    process.stdout.write(JSON.stringify(dropdownOptions, null, 4));
    // Copy output to ExportTypeDropdown.ts, then manually add common aliases
}

main();
