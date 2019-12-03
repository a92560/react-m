/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2019-11-20 12:50:46
 * @LastEditors: Darren
 * @LastEditTime: 2019-11-20 12:52:10
 */
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  }),
);