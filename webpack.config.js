const path = require('path')
console.log("in webpack config");
module.exports = {
    entry: {
        main: path.resolve(__dirname, './lib/index.tsx'),
    },
        module: {
        loaders: [
            {
                test: /\.(ts|tsx)?$/,
                use: "awesome-typescript-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".less"]
    }
};
console.log("finshed reading webpack config");