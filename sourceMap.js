import sourceMap from 'source-map';

async function main() {
	const map = await fetch('https://emeditor.org/excel-csv-import/main.6df4cb40757b5d211b41.js.map');
	const smc = await new sourceMap.SourceMapConsumer(await map.text());
	console.log(smc.originalPositionFor({ line: 2, column: 408765 }));
}

void main();
