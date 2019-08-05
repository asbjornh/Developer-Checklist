const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env = {}) => {
  const isProduction = env.production === true;

  return {
    entry: {
      app: "./source/app.js"
    },
    output: {
      path: path.resolve(__dirname + "/build"),
      filename: isProduction ? "[name].[hash].js" : "[name].js"
    },
    devServer: {
      stats: "minimal"
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract([
            {
              loader: "css-loader",
              options: { importLoaders: 1 }
            }
          ])
        },
        {
          test: /\.scss$/,
          exclude: /\.module\.scss$/,
          use: ExtractTextPlugin.extract([
            {
              loader: "css-loader",
              options: { importLoaders: 1 }
            },
            { loader: "postcss-loader", options: { plugins: [autoprefixer] } },
            { loader: "resolve-url-loader" },
            { loader: "sass-loader", options: { sourceMap: true } }
          ])
        },
        {
          test: /\.module\.scss$/,
          use: ExtractTextPlugin.extract([
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[local]__[hash:base64:5]"
                }
              }
            },
            { loader: "postcss-loader", options: { plugins: [autoprefixer] } },
            { loader: "sass-loader" }
          ])
        },
        {
          test: /\.png$/,
          use: "url-loader"
        },
        {
          test: /\.(svg|jpg|woff2?|ttf|eot)$/,
          use: "file-loader"
        },
        {
          test: require.resolve("react"),
          loader: "expose-loader?React"
        },
        {
          test: require.resolve("react-dom"),
          loader: "expose-loader?ReactDOM"
        },
        {
          test: require.resolve("react-dom/server"),
          loader: "expose-loader?ReactDOMServer"
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ["babel-loader", "eslint-loader"]
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx", ".scss"]
    },
    plugins: (() => {
      const plugins = [
        new ExtractTextPlugin({
          filename: "app.css",
          allChunks: true
        }),
        new HtmlWebpackPlugin({
          template: "source/index.html"
        }),
        new CopyWebpackPlugin(
          [{ from: "source/data/popups", to: "data/popups" }],
          { copyUnmodified: true }
        )
      ];

      if (isProduction) {
        return plugins.concat([
          new webpack.DefinePlugin({
            "process.env": {
              NODE_ENV: JSON.stringify("production")
            }
          }),
          new webpack.optimize.UglifyJsPlugin()
        ]);
      }

      return plugins;
    })()
  };
};
