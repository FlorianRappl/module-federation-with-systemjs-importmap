const { ModuleFederationPlugin } = require("webpack").container;
const { resolve } = require("path");

const deps = require('./package.json').dependencies;

module.exports = {
    mode: "development",
    entry: {
        mf1: 'systemjs-webpack-interop/auto-public-path',
    },
    output: {
        path: resolve(__dirname, "dist"),
        libraryTarget: "system",
        publicPath: 'auto',
    },
    module: {
      rules: [
        {
          test: /\.png/,
          type: 'asset/resource'
        }
      ]
    },
    target: "web",
    plugins: [
        new ModuleFederationPlugin({
            name: "mf1",
            library: { type: "system", name: "mf1" },
            filename: 'remoteEntry.js',
            exposes: {
                'app': './src/index',
            },
            shared: {
                'emojis-list': {
                    requiredVersion: deps['emojis-list'],
                    singleton: true,
                    import: "emojis-list",
                    shareKey: "emojisList",
                    shareScope: "default",
                }
            },
        })
    ],
};
