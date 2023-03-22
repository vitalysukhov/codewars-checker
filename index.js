const { Command } = require('commander');
const { loadConfig } = require('./config-loader');
const { fetchAllUsersChallenges } = require('./codewars-api');

const program = new Command();

program.command('sync-cw')
  .description('Synchronize complete CodeWars challenges')
  .option('--config <string>', 'Path to JSON config file')
  .action(async (options) => {
    const config = await loadConfig(options.config);
    const usersChallenges = await fetchAllUsersChallenges(config.codewars_users[0]);
    console.log(usersChallenges)
  });

program.parse();
