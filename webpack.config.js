const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : './src/js/index.js', 
    output : {
        path: path.resolve(__dirname, 'dist'),
        filename : 'js/bundle.js'
    },
    devServer : {
        contentBase : './dist'
    },
    plugins : [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template : './src/index.html'
        }),
         new HtmlWebpackPlugin({
             filename : 'movieInfo.html',
             template : './src/movieInfo.html'
        }),
        new HtmlWebpackPlugin({
            filename : 'full_cast_crew.html',
            template : './src/full_cast_crew.html'
        }),
        new HtmlWebpackPlugin({
            filename : 'tv_info.html',
            template : './src/tv_info.html'
        }),
        new HtmlWebpackPlugin({
            filename : 'people_info.html',
            template : './src/people_info.html'
        }),
        new HtmlWebpackPlugin({
            filename : 'navbar_movie.html',
            template : './src/navbar_movie.html'
        }),
        new HtmlWebpackPlugin({
            filename : 'navbar_tv.html',
            template : './src/navbar_tv.html'
        }),
        new HtmlWebpackPlugin({
            filename : 'popular_person.html',
            template : './src/popular_person.html'
        }),
        new HtmlWebpackPlugin({
            filename : 'search_results.html',
            template : './src/search_results.html'
        })
    ]
} 