import fs from 'fs';
import path from 'path';

const sourcePath = path.join(process.cwd(), 'docs', 'CHANGELOG.MD');
const outputPath = path.join(process.cwd(), 'data', 'changelog.json');

if (!fs.existsSync(sourcePath)) {
    console.error('Error: docs/CHANGELOG.MD not found.');
    process.exit(1);
}

const lines = fs.readFileSync(sourcePath, 'utf8').split('\n');
const entries = [];
let currentDate = '';
let currentEntry = null;

for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
        if (currentEntry) entries.push(currentEntry);
        currentDate = trimmed.substring(3).trim();
        currentEntry = null;
    } else if (trimmed.startsWith('### ')) {
        if (currentEntry) entries.push(currentEntry);
        currentEntry = { date: currentDate, title: trimmed.substring(4).trim(), content: '' };
    } else if (currentEntry && trimmed) {
        currentEntry.content += (currentEntry.content ? '\n' : '') + trimmed;
    }
}

if (currentEntry) entries.push(currentEntry);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify({ generatedAt: new Date().toISOString(), entries }, null, 2));
console.log(`Successfully generated ${outputPath}`);
