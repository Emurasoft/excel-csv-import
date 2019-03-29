const fs = require('fs');

const newLocale = 'ja'; // Locale name of new file

function main() {
    const text = fs.readFileSync(__dirname + '/en.json');
    const copied = {};
    for (const namespace of Object.entries(JSON.parse(text.toString()))) { // namespace.ID
        const copiedNamespace = {};
        for (const entry of Object.entries(namespace[1])) {
            if (
                newLocale !== 'blank'
                && (entry[0].includes('[URL]') || entry[0].includes('[paragraph]'))
            ) {
                copiedNamespace[entry[0]] = entry[1];
            } else {
                copiedNamespace[entry[0]] = '';
            }
        }
        copied[namespace[0]] = copiedNamespace;
    }
    fs.writeFileSync(__dirname + `/${newLocale}.json`, JSON.stringify(copied, null, 2));
}

main();