const fs = require('fs');

const rows = 1000;
const columns = 10;
const bytesPerCell = 10;

/**
 * @returns {string}
 */
function row() {
	let result = '';
	for (let i = 0; i < columns; ++i) {
		result += 'a'.repeat(bytesPerCell) + ',';
	}
	return result.substring(0, result.length - 1) + '\n';
}

function main() {
	const rowStr = row();
	fs.writeFileSync(__dirname + '/csvFile.csv', '');
	const fd = fs.openSync(__dirname + '/csvFile.csv', 'a');
	for (let i = 0; i < rows; i++) {
		fs.writeSync(fd, rowStr);
	}
}

main();