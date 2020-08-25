const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = {
  devServer: {
    historyApiFallback: true,
    inline: true,
    hot: true,
    open: false,
    disableHostCheck: true,
    port: 3000,
    proxy: {
      '/api/conductor': {
        target: 'http://localhost:3001',
        secure: false,
        // Uncomment below settings when testing frinx-workflow-ui running on host and talking to workflow-proxy in net-auto
        // target: 'http://localhost:8088',
        // secure: false,
        // pathRewrite: {'^/api/conductor' : ''},
        // headers: {
        //   'from': 'fb-user',
        //   'x-tenant-id': 'fb',
        // }
      }
    }
  },
  output: {
    publicPath: '/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(css|scss})$/,
        loader: 'style-loader!css-loader!sass-loader'},
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(jpe?g|gif|png|svg|)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: 'file-loader?name=fonts/[name].[ext]!static'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    })
  ]
};
