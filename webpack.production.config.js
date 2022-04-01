const path = require("path");
// const TerserPlugin = require("terser-webpack-plugin");//no need i prod automat
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    index: path.resolve(__dirname, "./src/index.js"),
    script: path.resolve(__dirname, "./src/script.js"),
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./build"),
    publicPath: "./",
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  mode: "production",

  module: {
    rules: [
      {
        test: /\.(png|jpeg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: "/node_modules",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["transform-class-properties"],
          },
        },
      },
      { test: /\.hbs$/, use: ["handlebars-loader"] },
    ],
  },
  plugins: [
    // new TerserPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      title: "Hello",
      filename: "index.html",
      chunks: ["index", "vendor~index~script"],
      template: path.resolve(__dirname, "./src/index.hbs"),
      description: "HEHE",
    }),
    new HtmlWebpackPlugin({
      title: "Hello",
      filename: "script.html",
      chunks: ["script", "vendor~index~script"],
      template: path.resolve(__dirname, "./src/index.hbs"),
      description: "HEHE",
    }),
  ],
};
