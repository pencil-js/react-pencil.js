// Webpack configuration
module.exports = {
    module: {
        rules: [
            {
                // Redirect all .js file to babel
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
