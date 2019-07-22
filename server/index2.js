const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
// const { htmlTpl, ejsTpl, pugTpl } = require('./tpl')
// const ejs = require('ejs')
// const pug = require('pug')
// const views = require('koa-views')
const { resolve } = require('path')
const { connect, initSchemas, initAdmin } = require('./database/init')
// const router = require('./router')
const R = require('ramda')
const MIDDLEWARES = ['common', 'router']

const useMiddlewares = (app) => { //函数式编程 执行中间件数组
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)
      ),
      require,
      name => resolve(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}

;(async () =>{
	await connect()
	initSchemas()
	// await initAdmin()
	// const Movie = mongoose.model('Movie')
	// const movies = await Movie.find({})
	
	// console.log('movies', movies)
	// require('./tasks/movie')
	// require('./tasks/api')
	
	const app = new Koa()
	await useMiddlewares(app)
	
	app.listen(4455)
	
})()

// app.use(views(resolve(__dirname, './views'), {
// 	extension: 'pug'
// }))

// app.use(async (ctx, next) => {
// 	// ctx.type = 'text/html; charset=utf-8'
// 	// ctx.body = pug.render(pugTpl, {
// 	// 	you: 'Luke',
// 	// 	me: 'Scott'
// 	// })
// 	await ctx.render('index', {
// 		you: 'Luke',
// 		me: 'Scott'
// 	})
// })
// app.use(router.routes()).use(router.allowedMethods())
// 
// app.listen(4455)