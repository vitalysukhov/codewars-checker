const { Command } = require('commander');
const { loadConfig } = require('./config-loader');
const { fetchAllUsersChallenges } = require('./codewars-api');
const { generateCvsReport } = require('./report-generator');

const program = new Command();

program.command('report')
  .description('Synchronize complete CodeWars challenges')
  .option('--config <string>', 'Path to JSON config file')
  .action(async (options) => {
    const config = await loadConfig(options.config);
    const usersChallenges = await fetchAllUsersChallenges(config.codewars_users);
    await generateCvsReport(usersChallenges, config.codewars_challenges);
  });

program.parse();
