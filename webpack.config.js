const { resolve } = require("path");

module.exports = {
    entry: resolve(__dirname, "./src/web.js"),
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-react",
                        ],
                    },
                },
            },
        ],
    },
};
