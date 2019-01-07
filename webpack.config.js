const webpack = require("webpack");
const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports = {
  mode: "development",
  entry: "./client/app.js",
  devtool: 'source-map',
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: __dirname + "/public",
    publicPath: "/",
    filename: "bundle.js",
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  plugins: [
    new NodemonPlugin({
      watch: ["server.js", "./src", "./api"],
      script: './server.js',
      ext: 'js,njk,json'
    }),
    new webpack.HotModuleReplacementPlugin({
      debug: true
    })
  ],
  devServer: {
    contentBase: "./dist",
    hot: true
  }
};
