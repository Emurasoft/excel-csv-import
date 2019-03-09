// Finds test files and adds them to index.ts because I can't find a better way to do this.
const fs = require('fs');

let output = '';
for (const path of fs.readdirSync(__dirname + '/../src')) {
    if (path.includes('.test.ts')) {
        output += 'import \'' + __dirname + '/../src/' + path + '\';\n';
    }
}

fs.writeFileSync(__dirname + '/index.ts', output)