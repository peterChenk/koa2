const puppeteer = require('puppeteer')

const base = `https://movie.douban.com/subject/`
const doubanId = '24753477'
const videoBase = `https://movie.douban.com/trailer/219491`

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
			await page.goto(base + doubanId, {
				waitUntil: 'networkidle2',
				timeout: 3000000
			})
	} catch (err) {
			console.log(err);
	}

	try {
		await sleep(1000)
	} catch (err) {
		console.log(err);
	}

// 	try {
// 		await page.waitForSelector('.more')
// 	} catch (err) {
// 		console.log(err);
// 	}
// 
// 	for (let i = 0; i < 1; i++) {
// 		try {
// 			await sleep(3000)
// 		} catch (err) {
// 			console.log(err);
// 		}
// 		try {
// 			await page.click('.more')
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	}
	// await page.goto(base + doubanId, {
	// 	waitUntil: 'networkidle2'
	// })
	const result = await page.evaluate(() => {
		var $ = window.$
		// var =window.=window.
		var it = $('.related-pic-video')
		var items = $('.list-wp a')
		var links = []

		if (it && it.length > 0) {
		  var link = it.attr('href')
			let statIdx = it.attr('style').indexOf('(')
			let lastIdx = it.attr('style').indexOf(')')
		  var cover = it.attr('style').substring(statIdx + 1, lastIdx)
			
		  return {
		    link,
		    cover
		  }
		}
		return {}
				
	})
	
	let video
			
	if (result.link) {
	  await page.goto(result.link, {
			waitUntil: 'networkidle2',
			timeout: 3000000
	  })
	  await sleep(2000)
			
	  video = await page.evaluate(() => {
	    var $ = window.$
	    var it = $('source')
			
	    if (it && it.length > 0) {
	      return it.attr('src')
	    }
			
	    return ''
	  })
	}
			
	const data = {
	  video,
	  doubanId,
	  cover: result.cover
	}
			
	process.send(data)
	
	// return links

	browser.close()

	console.log('data', data)
	// process.send({result})
	process.exit(0)
})()
