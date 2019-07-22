module.exports = `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scake=1" />
			<title>Koa Server HTML</title>
			<link href="https://cdn.bootcss.com/twitter-bootstrap/4.0.0-beta.2/css/bootstrap.min.css" rel="style/sheet">
			<script href="https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js"></script>
			<script src="https://cdn.bootcss.com/twitter-bootstrap/4.0.0-beta.2/js/bootstrap.bundle.min.js"></script>
		</head>
		<body>
			<div class="container">
				<div class="row">
					<div class="clo-md-8">
						<h1>hi <%=you %></h1>
						<p>this is <%=me %></p>
					</div>
					<div class="clo-md-4">
						<p>测试动态 ejs 页面</p>
					</div>
				</div>
			</div>
		</body>
	</html>
`