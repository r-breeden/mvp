module.exports = {
  //in Node.js __dirname refers to the currently executing file
  entry: __dirname + '/client/index.js',
  module: {
    loaders: [
      {
        //this regular expression represents all the patterns that end with js
        //this means the loader will preform the transformation on all of the js files
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  //specify where to put the transformed files
  output: {
    filename: 'transformed.js',
    path: __dirname + '/build'
  }
};