/**
 * Copyright 2017 California Institute of Technology.
 *
 * This source code is licensed under the APACHE 2.0 license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

 "use strict";
 console.log("graceal in the webpack config file");

 const webpack = require("webpack");
 const path = require("path");
 const HtmlWebpackPlugin = require("html-webpack-plugin");
 const StyleExtHtmlWebpackPlugin = require("style-ext-html-webpack-plugin");
 
 const BASE_DIR = path.resolve("./");
 
 module.exports = options => {
     const GLOBALS = Object.assign(
         {
             __DEV__: !options.isProduction, // signal for nodejs build process
             __VERSION__: JSON.stringify(require(path.join(BASE_DIR, "package.json")).version), // Make package.json version available as a global variable
             __NAME__: JSON.stringify(require(path.join(BASE_DIR, "package.json")).name), // Make package title version available as a global variable
             "process.env": {
                 NODE_ENV: JSON.stringify(options.node_env)
             }
         },
         options.globals
     );
 
     // define the webpack config
     let webpackConfig = {
         devtool: options.devtool, // what kind of sourcemap to use
         target: "web", // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
         output: {
             path: path.join(BASE_DIR, "dist"), // Note: Physical files are only output by the production build task `npm run build`.
             publicPath: "", // Location of static assets relative to server root. Basically your standard `static_path` config
             sourcePrefix: "" // Required for Cesium loading since Cesium uses some multi-line strings in its code and webpack indents them improperly - https://cesiumjs.org/2016/01/26/Cesium-and-Webpack/
         },
         plugins: [
             new webpack.DefinePlugin(GLOBALS),
             new webpack.optimize.ModuleConcatenationPlugin(),
             new webpack.LoaderOptionsPlugin({
                 debug: true
             }),
             new HtmlWebpackPlugin({
                 filename: "index.html",
                 template: path.join(BASE_DIR, "src/index_template.html"),
                 inject: false, // Do not auto inject js and css, we'll take care of that through templating for better control over asset positioning
                 isProduction: options.isProduction,
                 excludeChunks: ["inlineStyles"], // Don't include inlineStyles for templating purposes, we'll take care of that separately with our StyleExtHtmlWebpackPlugin
                 hash: true // Append a query string + the webpack build hash onto the output js and css files for cache busting
             })
        ],
         module: {
             unknownContextCritical: false, // Tells webpack to ignore some warnings due to the way Cesium dynamically builds module paths - https://cesiumjs.org/2016/01/26/Cesium-and-Webpack/
             noParse: [path.join(BASE_DIR, "node_modules/proj4/dist/proj4.js")], // Tells webpack not to parse these files and expects these fles will have no require, define, or similar, but can use exports and module.exports. See https://webpack.github.io/docs/configuration.html#module-noparse
         }
     };
 
     return webpackConfig;
 };
 