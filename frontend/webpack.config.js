const path = require('/Users/namhlahade/Documents/GitHub/DukeNutrition/');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
