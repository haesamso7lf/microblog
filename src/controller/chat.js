
module.exports = {
    showChat: function (req, res) {
	var generateMessage = (from, text) => {
		return {
			from,
			text,
			createdAt: new Date().getTime()
		};
	};
	
	req.io.on('connection', (socket) => {
		console.log('New user connected');
	
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
		socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined')
		);
		socket.on('createMessage', (message) => {
			console.log('createMessage', message);
			req.io.emit('newMessage', generateMessage(message.from, message.text));
			/*socket.broadcast.emit('newMessage', {
				from: message.from,
				text: message.text,
				createdAt: new Date().getTime()
			});*/
		});
		
		socket.on('disconnect', () => {
			console.log('User was disconnected');
		});
	});
	console.log(req.body);
	res.render('chat/chat.ejs');
    }
}
