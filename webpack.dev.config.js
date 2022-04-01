const path = require("path");
// const TerserPlugin = require("terser-webpack-plugin"); //! no need of minify in dev
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    // filename: "build.[contenthash].js", //!no need of cache in dev
    filename: "build.js",
    path: path.resolve(__dirname, "./dist"),
    //  publicPath: "dist/",//!will be use for where the assets is located
    // publicPath: "./", //in this case all the asset are in same dist folders
    clean: true,
  },
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
      publicPath: "./",
    },
    port: 8080,
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpeg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.css$/,
        // use: [MiniCssExtractPlugin.loader, "css-loader"], //! not need to extract css file separately
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        // use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
    // new MiniCssExtractPlugin({
    //   filename: "styles.[contenthash].css",
    // }),
    new HtmlWebpackPlugin({
      title: "Hello",
      filename: "index.html",
      template: path.resolve(__dirname, "./src/index.hbs"),
      description: "HEHE",
    }),
  ],
};
