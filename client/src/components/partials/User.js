import React, { Component } from 'react'

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		}
	}
	componentDidMount() {
		fetch("http://127.0.0.1:3005/api/users")
		.then(res => res.json())
		.then(users => {
			/*users.map((user, index) => {
				console.log(user.username);
			});*/
			//console.log(users);
			this.setState({users})
		})
	}
	render () {
		return (
			<div className="card">
				<div className="card-header">Members</div>
				<div className="card-body">
					<div className="d-flex flex-wrapper">
						{
							this.state.users.map((user, index) => {
								return (
								<div className="p-2 m-1">
									<img className="rounded-circle" style={{width: '50px', height:'50px'}} src={'http://127.0.0.1:3005/uploads/avatar/' + user.avatar} alt="" />	
									<br />
									<a href={"/profile/" + user._id}>{user.username}</a>
								</div>)							
							})
						}
					</div>
				</div>
			</div>
		)
	}
}

export default User;