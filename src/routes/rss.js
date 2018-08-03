const express = require('express');
const router = express.Router();
const {User} = require('./../models/user');
const {Category} = require('./../models/category');
const {Post} = require('./../models/post');
const {Comment} = require('./../models/comment');
const {ObjectID} = require('mongodb');

const RSS = require('rss');


router.get('/', (req, res) => { 
	/* lets create an rss feed */
	var feed = new RSS({
		title: 'title',
		description: 'description',
		feed_url: 'http://example.com/rss.xml',
		site_url: 'http://127.0.0.1:3000/',
		image_url: 'http://example.com/icon.png',
		docs: 'http://example.com/rss/docs.html',
		managingEditor: 'Dylan Greene',
		webMaster: 'Dylan Greene',
		copyright: '2013 Dylan Greene',
		language: 'en',
		categories: ['Category 1','Category 2','Category 3'],
		pubDate: 'May 20, 2012 04:00:00 GMT',
		ttl: '60',
		custom_namespaces: {
		  'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
		},
		custom_elements: [
		  {'itunes:subtitle': 'A show about everything'},
		  {'itunes:author': 'John Doe'},
		  {'itunes:summary': 'All About Everything is a show about everything. Each week we dive into any subject known to man and talk about it as much as we can. Look for our podcast in the Podcasts app or in the iTunes Store'},
		  {'itunes:owner': [
			{'itunes:name': 'John Doe'},
			{'itunes:email': 'john.doe@example.com'}
		  ]},
		  {'itunes:image': {
			_attr: {
			  href: 'http://example.com/podcasts/everything/AllAboutEverything.jpg'
			}
		  }},
		  {'itunes:category': [
			{_attr: {
			  text: 'Technology'
			}},
			{'itunes:category': {
			  _attr: {
				text: 'Gadgets'
			  }
			}}
		  ]}
		]
	});
 

	Post.find({}).then((posts) => {
		posts.forEach((post) => {			
			feed.item({
				title:  post.title,
				description: post.content,
				url: `http://127.0.0.1:3000/post/${post._id}`, // link to the item
				guid: '1123', // optional - defaults to url
				categories: [post.category], // optional - array of item categories
				author: 'Eimoo', // optional - defaults to feed author property
				date: post.date, // any format that js Date can parse.
				lat: 33.417974, //optional latitude field for GeoRSS
				long: -111.933231, //optional longitude field for GeoRSS
				//enclosure: {url:'...', file:'path-to-file'}, // optional enclosure
				custom_elements: [
				  {'itunes:author': 'John Doe'},
				  {'itunes:subtitle': 'A short primer on table spices'},
				  {'itunes:image': {
					_attr: {
					  href: 'http://example.com/podcasts/everything/AllAboutEverything/Episode1.jpg'
					}
				  }},
				  {'itunes:duration': '7:04'}
				]
			});			
		});
		res.type('rss');
		res.send(feed.xml());
	});
});


module.exports = router;

