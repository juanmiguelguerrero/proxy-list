const cheerio = require('cheerio')
const fetch = require('node-fetch')

async function loadURL(url) {

	const options = {
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'
		}
	}

	let response = await fetch(url, options).then(res => res.text())
	return response
}

// Extract a proxy list from https://free-proxy-list.net
async function proxyListScrapper() {

	const url = 'https://free-proxy-list.net'

	let results = []
	let html = await loadURL(url)
	let $ = cheerio.load(html)

	$('#proxylisttable tbody tr').each((i, element) => {

		let ip = $(element).find('td:first-child').text()
		let port = $(element).find('td:nth-child(2)').text()
		let code = $(element).find('td:nth-child(3)').text()
		let country = $(element).find('td:nth-child(4)').text()

		let proxy = {
			ip: ip,
			port: port,
			code: code,
			country: country
		}

		results.push(proxy)

		// Exit when number of results equal 50
		if (i === 49) return false
	})

	return results
}

module.exports = proxyListScrapper