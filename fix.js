const fs = require('fs');
const path = require('path');
const dir = './components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
files.forEach(file => {
    const p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf8');
    let original = content;
    content = content.replace(/margin:\s*"-(\d+)px"/g, 'margin: "-10px"');
    if (content !== original) {
        fs.writeFileSync(p, content, 'utf8');
        console.log('Updated ' + file);
    }
});
