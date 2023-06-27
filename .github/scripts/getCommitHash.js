const fs = require('fs');

const commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString()
  .trim();

  fs.appendFileSync('../../.env', `\nREACT_APP_VERSION=${JSON.stringify(commitHash)}`, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });



