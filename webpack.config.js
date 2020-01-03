const path = require('path')
module.exports = {

    entry: path.join(__dirname, '/client/src/components/app.jsx')
    //'./client/src/components'
    ,
    module: {
        rules: [
            {
                test: /\.(jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },


            },
        ]
    },
    output: {
        path: path.join(__dirname, 'client/dist'),
        filename: 'bundle.js'
    }
}