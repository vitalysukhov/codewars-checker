## Overview

Small NodeJS tool to tack user process on [CodeWars](https://codewars.com/) challenges.

CodeWars [DEV API](https://dev.codewars.com/#list-completed-challenges) was used for this.

## How to use

1. Run `npm start` in source dir or `node node index.js report --config ./test-config.json` (from `package.json`);
2. CSV report will be generated in some time (no progress tracking for now);


`--config` should provide path to JSON with list of users (`codewars_users`) and list of tasks (`codewars_challenges`) you want to track.

CSV report contains Task Name/User Name and if it is solved or not, and how many other (no set in config json file) challenges are solved.
