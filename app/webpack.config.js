const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { resolve } = require("path");

const deps = require("./package.json").dependencies;

module.exports = {
  mode: "development",
  entry: "./src/index",
  output: {
    path: resolve(__dirname, "dist"),
    publicPath: "auto",
  },
  target: "web",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: resolve(__dirname, "static") }],
    }),
    new HtmlWebpackPlugin({
      inject: "body",
      templateContent: `<!DOCTYPE html>
            <html>
                <head>
                    <title>Example</title>
                    <meta name="importmap-type" content="systemjs-importmap">
                    <link rel="preload" href="/import-map.json" as="fetch" crossorigin="anonymous">
                    <script type="systemjs-importmap" src="/import-map.json"></script>
                </head>
                <body></body>
            </html>`,
    }),
    new ModuleFederationPlugin({
      name: "app",
      shared: {
        react: {
          requiredVersion: deps.react,
          singleton: true,
          import: "react",
          shareKey: "react",
          shareScope: "default",
        },
      },
    }),
  ],
};
