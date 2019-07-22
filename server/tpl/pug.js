module.exports = `
DOCTYPE html
html
	head
	meta(charset="utf-8")
	meta(name="viewport" content="width=device-width, initial-scake=1")
	title Koa Server HTML
	link(href="https://cdn.bootcss.com/twitter-bootstrap/4.0.0-beta.2/css/bootstrap.min.css" rel="style/sheet")
	script(href="https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js")
	script(src="https://cdn.bootcss.com/twitter-bootstrap/4.0.0-beta.2/js/bootstrap.bundle.min.js")
	body
		.container
		.row
		.clo-md-8
			h1 hi #{you}
			p this is #{me}
		.clo-md-4
		p 测试动态的 pug 模板引擎
`