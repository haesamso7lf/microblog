const express = require('express');
const router = express.Router();
const sm = require('sitemap');

sitemap = sm.createSitemap({
	hostname: '127.0.0.1:3000',
	cacheTime: 600000,
	urls: [
		{url: '/category/', changefreq: 'monthly', priority: 0.3},
		{url: '/rss/', changefreq: 'daily', priority: 0.7}
	]
});

router.get('/', (req, res) => { 
	sitemap.toXML((err, xml) => {
		if (err) {
			return res.status(500).end();
		}
		res.header('Content-Type', 'application/xml')
		res.send(xml);
	});
});


module.exports = router;

