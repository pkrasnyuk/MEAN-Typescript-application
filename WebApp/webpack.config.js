var NodeExternals = require("webpack-node-externals");

module.exports = {
    entry: "./server.ts",
    output: {
        path: __dirname,
        filename: "./application.js"
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".node", ".ts", ".json"]
    },
    module: {
        loaders: [
            { test: /.ts$/, loader: "awesome-typescript-loader", exclude: /node-modules/ }
        ]
    },
    target: "node",
    externals: [NodeExternals()],
    node: {
        __filename: true,
        __dirname: true
    }
};