const path = require('path');

module.exports = {
  entry: {
    main: "./lib/javascripts/index.js",
    test: "mocha!./test/index.js"
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  },
  module: {
    // rules: [{
    //        test: /\.scss$/,
    //        use: [
    //            "style-loader", // creates style nodes from JS strings
    //            "css-loader", // translates CSS into CommonJS
    //            "sass-loader" // compiles Sass to CSS, using Node Sass by default
    //        ]
    //    }],

    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: "index!css" },
      { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"] },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.css', '.scss']
  }
};
