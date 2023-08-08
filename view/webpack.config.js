const path = require('/DukeNutrition/');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new NodePolyfillPlugin()
  ],
  resolve: {
    fallback: {
      "console": require.resolve("console-browserify"), // or false if you don't want a polyfill
      "stream": false,
      util: require.resolve("util/"),
      "path": require.resolve("path-browserify"),
    }
  }
};
