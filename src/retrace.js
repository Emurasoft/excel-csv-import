const retrace = require('retrace');
const fs = require('fs');
const path = require('path');
const http = require('http');

/**
 * Translates minified stack trace to readable stack trace.
 * @returns {Promise<void>}
 */
async function main() {
    const server = http.createServer(function (request, response) {
        response.writeHead(200);
        // fs.createReadStream(__dirname + '/../..' + request.url).pipe(response);
        fs.createReadStream(__dirname + '/../build' + request.url).pipe(response);
    });
    server.listen(3000);

    for (const filepath of fs.readdirSync(__dirname + '/../build')) {
        const pathInfo = path.parse(filepath);
        if (pathInfo.ext === '.js') {
            registerName(pathInfo.name);
        }
    }

    const rawTrace = await inputRawTrace();
    // rawTrace.replace(/https:\/\/emurasoft.github.io/g, 'http://localhost:3000');
    const stack = await retrace.map(rawTrace);
    server.close();

    console.log(stack);
    process.exit();
}

/**
 * @param {string} name
 */
function registerName(name) {
    const sourceMap = fs.readFileSync(__dirname + `/../build/${name}.js.map`, 'utf8');
    retrace.register(`http://localhost:3000/excel-csv-import/build/${name}.js`, sourceMap);
}

/**
 * @returns {Promise<string>}
 */
function inputRawTrace() {
    return new Promise((resolve) => {
        let rawTrace = '';
        process.stdin.on('data', (line) => {
            rawTrace += line;

            if (line.toString() === '\n') {
                process.stdin.removeAllListeners();
                resolve(rawTrace);
            }
        });

        process.stdout.write('Input minified stack trace with an empty line at the end:\n');
        console.warn('[fix code to use correct paths!]\n');
    });
}

// noinspection JSIgnoredPromiseFromCall
main();