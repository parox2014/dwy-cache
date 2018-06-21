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
    library: 'dwyCache',
    globalObject:'typeof self !== \'undefined\' ? self : this'
  },
  mode:'production',
  module:{
    rules:[
      {
        test:/\.js$/,
        loader:'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  optimization:{
    minimize:true
  }
};
