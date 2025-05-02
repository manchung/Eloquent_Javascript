const {readFile, readdir, stat} = require('fs').promises

async function grepOne(pattern, file) {
    try {
        const stats = await stat(file);
        if (stats.isDirectory()) {
            let files = await readdir(file);
            files.map(f => grepOne(pattern, `${file}/${f}`));
        } else {
            grepOneFile(pattern, file);
        }
    } catch (err) {
        console.error(`Error reading file ${file}:`, err);
    }
}

async function grepOneFile(pattern, file) {
    readFile(file, 'utf8')
        .then(data => {
            const lines = data.split('\n');
            for (let line of lines) {
                if (pattern.test(line)) {
                    console.log(`${file}: ${line}`);
                }
            }
        })
        .catch(err => {
            console.error(`Error reading file ${file}:`, err);
        });
}

async function grepDir(pattern, dir) {
    try {
        const files = await readdir(dir);
        for (const file of files) {
            const filePath = `${dir}/${file}`;
            grep(pattern, filePath);
        }
    } catch (err) {
        console.error(`Error reading directory ${dir}:`, err);
    }
}

async function grep() {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.error('Usage: node grep.js <pattern> <file|directory>');
        process.exit(1);
    }
    // console.log(process.argv.slice(2));
    const pattern = new RegExp(args[0]);
    // console.log(pattern);
    
    for (let file of args.slice(1)) {
        // console.log(`grepOne ${file}`);
        await grepOne(pattern, file);
    }
}
grep();