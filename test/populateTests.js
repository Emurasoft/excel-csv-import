// Finds test files and adds them to index.ts because I can't find a better way to do this.
const fs = require('fs');

const paths = [
    '/../src',
    '/../src/components',
    '/../src/components/import',
]

let output = '';
for (const path of paths) {
    for (const file of fs.readdirSync(__dirname + path)) {
        if (file.includes('.test.ts')) {
            output += 'import \'' + __dirname + path + '/' + file + '\';\n';
        }
    }
}

fs.writeFileSync(__dirname + '/tests.ts', output)