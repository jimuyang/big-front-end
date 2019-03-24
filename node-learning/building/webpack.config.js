const path = require('path');

module.exports = {
    entry: {
        index: './src/scripts/index.js'
    },

    output: {
        path: path.resolve(__dirname, 'build/scripts'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, '/src/scripts')
                ],
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    }


}