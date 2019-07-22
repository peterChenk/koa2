// require('babel-register')({
//   presets: ['env']
// })
require('babel-core/register')()
require('babel-polyfill')
require('./server/index.js')
