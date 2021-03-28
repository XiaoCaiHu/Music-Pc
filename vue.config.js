const path = require('path');//引入path模块

function resolve(dir){

    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径

}

module.exports = {
  css: {
      loaderOptions: {
          sass: {
              prependData: `@import "./src/common/scss/variable.scss";`
          }
      }
  },
// 设置路径
  chainWebpack:(config)=>{
       config.resolve.alias
        .set('common',resolve('./src/common'))
        .set('components',resolve('./src/components'))
        .set('base',resolve('./src/base'))
        .set('assets',resolve('./src/assets'))
        .set('network',resolve('./src/network'))
    }
  
}