var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer-stylus');

module.exports = {
    entry: {
        polyfills: './src/polyfills.ts',
        app: './src/main.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loaders: [
                  {
                    loader: 'ts-loader'
                  },
                  'angular2-template-loader'
                ],
                // use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(pug|jade)$/,
                use: ['raw-loader', 'pug-html-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: 'style-loader!css-loader',
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                loaders: 'style-loader!css-loader!stylus-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.LoaderOptionsPlugin({
          options: {
              stylus: {
                  use: [autoprefixer({browsers: ['> 3%']})]
              },
            context: '/'
          }
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
};

