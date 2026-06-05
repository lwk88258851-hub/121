const fs = require('fs');
let content = fs.readFileSync('src/mock-data.ts', 'utf8');
content = content.replace(/export const /g, 'export let ');
fs.writeFileSync('src/mock-data.ts', content);
