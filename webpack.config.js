module.exports = {
    entry: {
        index: './src/fe/js/pages/index.js',
        add: './src/fe/js/pages/add.js',
        analyse: './src/fe/js/pages/analyse.js'
    },
   // mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'stage-0']

                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.less/,
                use: {
                    loader: 'less-loader'
                }
            }
        ]
    }
};