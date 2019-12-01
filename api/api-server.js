const express = require('express')
const router = express.Router()

const proxyListScrapper = require('./scrapper.js')

router.get('/', async (req, res) => {

	let proxyList = await proxyListScrapper()

	res.json(proxyList)
})

module.exports = router