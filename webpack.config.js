const path = require('path');
const glob = require("glob");

module.exports = {
  entry: glob.sync("./build/**/*.js"),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'script.min.js',
  },
}