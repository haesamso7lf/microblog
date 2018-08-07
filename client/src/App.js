import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/partials/Navbar';
import User from './components/partials/User';
import Category from './components/partials/Category';
import Post from './components/partials/Post';
import { translate, Trans } from 'react-i18next';
import I18n from '../node_modules/react-i18next/dist/commonjs/I18n';

const Home = () => (
	<h1>Home</h1>
)

const About = () => (
	<h1>About</h1>
)

const Chat = () => (
	<h1>Chat</h1>
)

const Stats = () => (
	<h1>Stats</h1>
)

class PostLink extends Component {
	constructor (props) {
		super(props);
		this.state = {
			post: {}
		}
	}
	componentDidMount () {
		fetch("http://127.0.0.1:3005/api/posts/5b404b77d9868504da1d9649")
		.then(res => res.json())
		.then(post => {
			console.log(post);
			this.setState({post})
		});
	}
	render () {
		return (
			<h1>PostLink: 
			{this.props.match.params.id} 
			{this.state.post.date}
			<Post 
			style={{margin: "16px"}}
			id={this.state.post._id}
			date={this.state.post.date}
			content={this.state.post.content}
			tag={this.state.post.tag}
			image={this.state.post.image}
			/>
			</h1>)
	}
} 


class Posts extends Component {
	constructor (props) {
		super(props);
		this.state = {
			posts: []
		}
	}
	
	componentDidMount() {
		fetch("http://127.0.0.1:3005/api/posts")
		.then(res => res.json())
		.then(posts => {				
			posts.map((post, index) => {
				console.log(post.image);
			});
			this.setState({posts: posts});
		});
		
		
	}
	render() {
		return (
			<div>
			{this.state.posts.map((post, idx) => {
			return <Post 
			style={{margin: "16px"}}
			key={idx} 
			user={post.user.username}
			avatar={post.user.avatar}
			userID={post.user._id}
			title={post.title}
			id={post._id}
			date={post.date}
			category={post.category.name}
			content={post.content}
			tag={post.tag}
			image={post.image}
			/>
			})}
			</div>
		)
	}
}

class App extends Component {
	render () {
	const {t, i18n} = this.props;
	return(
		<div className="container">
			<Navbar />
			<br />
			<br />
			<br />
			<br />
			{ t('welcome.title', { framework: "Eimoo the real motherfucking G" }) }
			<Switch>
				<Route exact path='/' component={Posts} />	
				<Route path='/user' component={User} />
				<Route path='/about' component={About} />
				<Route path='/chat' component={Chat} />
				<Route path="/category" component={Category} />
				<Route path='/stats' component={Stats} />
				<Route path='/post/:id' component={PostLink} />
			</Switch>
			<button onClick={ () => i18n.changeLanguage('es')}> es </button>
			<button onClick={ () => i18n.changeLanguage('en')}> en </button>
		</div>
		)
	}
}
export default translate('common')(App);