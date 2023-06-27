const webpack = require('webpack');

const commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString()
  .trim();

const commitMessage = require('child_process')
  .execSync('git log -1 --format=%s')
  .toString()
  .trim();

module.exports = new webpack.DefinePlugin({
  __VERSION__: JSON.stringify(commitHash),
  __VERSION__DESCRIPTION__: JSON.stringify(commitMessage),
});
