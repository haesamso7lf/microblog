import React, {Component} from 'react';

class Category extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: []
		}
	}
	componentDidMount() {
		fetch("http://127.0.0.1:3005/api/categories")
		.then(res => res.json())
		.then(categories => {
			this.setState({categories})
			console.log(categories)
		});
	}
	render() {
		return (
			<div className="list-group">
			{this.state.categories.map((category, index) => {
				return (
					<div key={index} className="list-group-item">
						<a href={"/categories/" + category._id}>{category.name}</a><br />
						{category.description}
					</div>)
			})}
			</div>
			
		)
	}
}

export default Category;