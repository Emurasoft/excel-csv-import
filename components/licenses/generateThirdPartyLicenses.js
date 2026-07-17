const childProcess = require('child_process');
const fs = require('fs');

function main() {
	const cwd = `${__dirname}/../../`;
	const output = childProcess.execSync('npx yarn licenses generate-disclaimer', { cwd }).toString();
	const trimmed = output.substring(output.indexOf('-----\n\n') + '-----\n\n'.length);
	const escaped = trimmed.replaceAll("'", "\\'");
	const newlinesReplaced = escaped.replaceAll('\n', '\\n');
	const text = `export default '${newlinesReplaced}';`;
	fs.writeFileSync(`${__dirname}/thirdParty.ts`, text);
}

main();
