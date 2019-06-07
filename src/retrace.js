const retrace = require('retrace');
const https = require('https');

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
    const stack = await retrace.map(rawTrace);

    process.stdout.write(stack + '\n');
    process.exit();
}

// noinspection JSIgnoredPromiseFromCall
main();