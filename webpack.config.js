var path=require('path');
var webpack=require('webpack');

module.exports={
  entry:'./src/index.js',
  output:{
    path:path.join(__dirname,'./dist/'),
    filename:'dwy-cache.js',
    // 组件采用UMD格式打包
    libraryTarget: 'umd',
    // 组件名称
    library: 'dwyCache'
  },
  module:{
    loaders:[
      {
        test:/\.js$/,
        loader:'babel',
        exclude: /node_modules/
      }
    ]
  },
  plugins:[
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};