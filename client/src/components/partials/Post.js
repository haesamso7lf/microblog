import React from 'react';
import Comment from './Comment';

//<Comment postID={props.id}/>
const Post = (props) => (

<div className="card" style={{margin: '16px'}}>

	<div className="card-body">
		<img src={"http://localhost:3005/uploads/avatar/" + props.avatar} alt="" className="rounded-circle" style={{maxWidth: '50px', maxHeight: '50px'}} />
		<a href={"/profile/" + props.userID}>{props.user}</a>
		<a className="badge badge-primary">{props.category}</a>
		<br />
		<a href={"/posts" + props.id}>{props.date}</a>
		<h4 className="card-title">{props.title}</h4>
		<div className="card-text">
			<h4 className="card-title">{props.content}</h4>
			<img src={"http://127.0.0.1:3005/uploads/" + props.image} alt="Card image cap" />
			<br />
			<u className="text-primary">{props.tag}</u>
		</div>
	</div>
	<div className="card-footer">
		
	</div>
</div>

);

export default Post;