module.exports = {
    entry: "./src/js/tabular_input.js",
    output: {
        path: __dirname + "/dist/js/",
        filename: "tabular_input.js"
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