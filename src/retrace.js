const retrace = require('retrace');
const https = require('https');

/**
 * @param {string} url
 */
function register(url) {
    return new Promise(resolve => {
        https.get(url.replace('.js', '.js.map'), (res) => {
            const chunks = [];
            res.on('data', (data) => {
                chunks.push(data);
            });
            res.on('end', () => {
                retrace.register(url, Buffer.concat(chunks).toString());
                resolve();
            });
        });
    })
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
    });
}

/**
 * Translates minified stack trace to readable stack trace.
 * @returns {Promise<void>}
 */
async function main() {
    const rawTrace = await inputRawTrace();

    const jsFiles = new Set(rawTrace.match(/https:\/\/emurasoft\.github\.io\/excel-csv-import\/.*\.js/g));

    const promises = [];
    for (const url of jsFiles) {
        promises.push(register(url));
    }
    await Promise.all(promises);

    const stack = await retrace.map(rawTrace);

    process.stdout.write(stack + '\n');
    process.exit();
}

// noinspection JSIgnoredPromiseFromCall
main();