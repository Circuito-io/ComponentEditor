const webpack = require("webpack");
const NodemonPlugin = require( 'nodemon-webpack-plugin' )

module.exports = {
  mode: "development",
  entry: "./src/client.js",
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: __dirname + "/public",
    publicPath: "/",
    filename: "bundle.js"
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
