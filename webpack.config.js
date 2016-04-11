module.exports = {
    entry: "./src/js/tabular-input.js",
    output: {
        path: __dirname + "/dist/js/",
        filename: "tabular-input.js"
    },
    module: {
        loaders: [
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: "babel",
            query: {
              presets: ['es2015']
            }
        }
      ]
  }
};