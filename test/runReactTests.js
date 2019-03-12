const {compileModule} = require('./compileModule');
const Mocha = require('mocha');

async function main() {
    await compileModule(__dirname + '/../src/components/import', 'SourceInput');

    process.env.TS_NODE_PROJECT = __dirname + '/../tsconfig.json';
    require('ts-mocha');

    const mocha = new Mocha();
    mocha.addFile(__dirname + '/../src/components/import/SourceInput.test.tsx');
    mocha.checkLeaks();
    mocha.run();
}

main();