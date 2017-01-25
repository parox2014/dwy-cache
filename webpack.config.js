var path=require('path');

module.exports={
  entry:'./src/index.js',
  output:{
    path:path.join(__dirname,'./dist/'),
    filename:'bundle.js',
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
  }
};