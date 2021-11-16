const { ModuleFederationPlugin } = require("webpack").container;
const { resolve } = require("path");

const deps = require('./package.json').dependencies;

module.exports = {
    mode: "development",
    entry: {
        mf2: 'systemjs-webpack-interop/auto-public-path',
    },
    output: {
        path: resolve(__dirname, "dist"),
        publicPath: 'auto',
        libraryTarget: "system",
    },
    target: "web",
    module: {
      rules: [
        {
          test: /\.png/,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "mf2",
            library: { type: 'system', name: "mf2" },
            filename: 'remoteEntry.js',
            exposes: {
                'app': './src/index',
            },
            shared: {
                react: {
                    requiredVersion: deps.react,
                    singleton: true,
                    import: "react",
                    shareKey: "react",
                    shareScope: "default",
                },
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
