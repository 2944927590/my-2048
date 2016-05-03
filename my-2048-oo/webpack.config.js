var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack/hot/only-dev-server',
        './src/js/index.js'
    ],
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.less/, loader: 'style-loader!css-loader!less-loader'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=10000'}
        ]
    },
    resolve: {
        extensions:['', '.js', '.json', '.less', '.css']
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
};