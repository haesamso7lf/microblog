const expect = require('expect');
const request = require('supertest');
const {app} = require('./../app');

const {User} = require('./../models/user');
const {Post} = require('./../models/post');

/*beforeEach doesn't work!*/
Post.remove({}).then();

		
describe('Post /post', () => {
	/*bad as fuck*/
	it('should create a new post', (done) => {
		var post = {
			title: "I love You, Fatima.",
			content: "I love you, girl.",
			tag: "love",
			category: "photos"	
		};
		
		request(app)
			.post('/post')
			.type('form')
			.send(post)
			.expect(200)
			//	expect(res.body.post).toBe(post);
			.end((err, res) => {
				if (err) {
					return done();
				}
				Post.find().then((posts) => {
					expect(posts.length).toBe(1);
					expect(posts[0].title).toBe(post.titdle);
				});	
			})/*.catch((e) => done(e))*/;
	});
});
