import React, {Component} from 'react';

class Comment extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: []
        }
    }
    componentDidMount(){
        fetch('http://127.0.0.1:3005/api/comments/post/' + this.props.postID)
        .then(res => res.json())
        .then(comments => {
            console.log(comments);
            this.setState({comments: comments});
        });
    }
    render () {
        return (
        <div>
            Here go the comments {this.props.postID}
            {this.state.comments.map((comment, index) => {
                return(
                <div key={index}>
                    <h4>{comment.user} </h4>
                    <h4>{comment.date} </h4>
                    <h4>{comment.content} </h4>
                </div>
                )
            })}
        </div>
        )
    }
}


export default Comment;