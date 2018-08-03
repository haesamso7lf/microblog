const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('stats/stats.ejs');
});

module.exports = router;

