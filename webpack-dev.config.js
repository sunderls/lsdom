module.exports = {
    entry: './src/runtime.js',
    output: {
        filename: './dist/lsdom.js'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                loader: 'babel-loader'
            }
        ]
    }
}
