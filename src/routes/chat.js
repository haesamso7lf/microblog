const express = require('express');
const router = express.Router();

//function ; must put them in separated file!
const controller = require('./../controller/chat');

router.get('/', controller.showChat);
router.get('/rooms', (req, res) => {
	res.render('chat/rooms.ejs');
});
module.exports = router;

