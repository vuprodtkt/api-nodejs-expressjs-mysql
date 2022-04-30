const moment = require('moment');
const execSync = require('child_process').execSync;

const dateTime = moment().format('MM/DD/YYYY HH:mm:ss');

execSync(`git add . && git commit -am \"Release at ${dateTime}\" && git push`, { stdio: [0, 1, 2]} );