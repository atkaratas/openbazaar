const fs = require('fs');
const os = require('os');
const path = require('path');

const configPath = path.join(os.homedir(), '.docker', 'config.json');
try {
    let content = fs.readFileSync(configPath, 'utf8');
    let config = JSON.parse(content);
    
    if (config.credsStore) {
        delete config.credsStore;
    }
    
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log('Fixed docker config');
} catch (e) {
    console.error(e);
}
