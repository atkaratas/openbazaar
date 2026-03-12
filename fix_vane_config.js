const fs = require('fs');

const path = '/Users/tk/workspace/ai-tools/Vane/data/config.json';
let config = JSON.parse(fs.readFileSync(path, 'utf8'));

config.search.searxngURL = "http://localhost:4000";

fs.writeFileSync(path, JSON.stringify(config, null, 2));
