/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2019-11-21 14:41:25
 * @LastEditors: Darren
 * @LastEditTime: 2019-11-21 14:41:32
 */
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://localhost:5000' }));
};