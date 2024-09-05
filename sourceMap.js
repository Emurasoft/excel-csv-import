const sourceMap = require('source-map');
const fetch = require('node-fetch')

async function main() {
	const map = await fetch('https://emurasoft.github.io/excel-csv-import/export~import.8f32e9df82fd02d124e8.js.map');
	const smc = await new sourceMap.SourceMapConsumer(await map.text());
	console.log(smc.originalPositionFor({line: 1, column: 3307}));
}

main();