const fs = require('fs/promises');

const loadConfig = async (configPath) => {
    // TODO. 
    // Validate path
    // Validate data structure
    const data = await fs.readFile(configPath, { encoding: 'utf8' });
    return JSON.parse(data);
}

module.exports = {
    loadConfig,
}