const puppeteer = require('puppeteer')

const url = 'https://movie.douban.com/tag/#/?sort=R&range=7,10&tags='

const sleep = time => new Promise(resolve => {
	setTimeout(resolve, time)
})

;
(async () => {
	console.log('Start visit the target page')
	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
		dumpio: false
	})

	const page = await browser.newPage()

	try {
		await page.goto(url, {
			waitUntil: 'networkidle2',
			timeout: 3000000
		})
	} catch (err) {
		console.log(err);
	}

	try {
		await sleep(3000)
	} catch (err) {
		console.log(err);
	}

	try {
		await page.waitForSelector('.more')
	} catch (err) {
		console.log(err);
	}

	for (let i = 0; i < 1; i++) {
		try {
			await sleep(3000)
		} catch (err) {
			console.log(err);
		}
		try {
			await page.click('.more')
		} catch (err) {
			console.log(err);
		}
	}

	const result = await page.evaluate(() => {
		var $ = window.$
		// var =window.=window.
		var items = $('.list-wp a')
		var links = []

		if (items.length >= 1) {
			items.each((index, item) => {
				let it = $(item)
				let doubanId = it.find('div').data('id')
				let title = it.find('.title').text()
				let rate = Number(it.find('.rate').text())
				let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')

				links.push({
					doubanId,
					title,
					rate,
					poster
				})
			})
		}

		return links
	})

	browser.close()

	console.log(result)
	process.send({result})
	process.exit(0)
})()
