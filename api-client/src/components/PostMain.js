import React, { Component } from 'react'
import { fetchPosts, fetchPost, votePost, deletePost, fetchComments, fetchNComments } from '../actions'
import { connect } from 'react-redux'

class PostMain extends Component {
	
	componentDidMount(){
		this.props.fetchNComments(this.props.post.id)
		
	}
	render() {
		const { posts } = this.props.store
		/*this.props.store.posts.map((post, index)=>{
			if(post.id === this.props.post.id)
				console.log(this.props.store.posts[index], this.props.store.posts[index].ncomments)
		})*/
		return (
			<div key={this.props.post.id} className="card">
			  <div className="card-body">
				<h4 className="card-title" onClick={() => {this.props.fetchPost(this.props.post.id);this.props.fetchComments(this.props.post.id);this.props.history.push('/view/post')}}>{this.props.post.title}<span className="badge badge-secondary">{new Date(this.props.post.timestamp).toLocaleDateString("en-US")}</span></h4>
				<h6 className="card-subtitle mb-2 text-muted">{this.props.post.author}</h6>
				<p className="card-text">{this.props.post.body}</p>
				<i onClick={() => {this.props.votePost(this.props.post.id, 'upVote', () => {this.props.fetchPosts('VA')})}} className="material-icons">thumb_up</i>&nbsp;
				{this.props.post.voteScore > -1
					? <span className="badge badge-success">{this.props.post.voteScore}</span>
					: <span className="badge badge-danger">{this.props.post.voteScore}</span>
				}
				&nbsp;<i onClick={() => {this.props.votePost(this.props.post.id, 'downVote', () => {this.props.fetchPosts('VA')})}} className="material-icons">thumb_down</i>
				<p>Comments: ({this.props.post.ncomments})</p>
				<div className="space-up">
					<a onClick={() => {this.props.fetchPost(this.props.post.id); this.props.history.push('/'+this.props.post.category.toUpperCase()+'/' + this.props.post.id)}} className="card-link">Edit Post</a>
					<a onClick={() => {this.props.deletePost(this.props.post.id, () => {this.props.fetchPosts('VA')}) }} className="card-link">Delete Post</a> {/*if you write href restart redux store*/}
				</div>
			  </div>
			</div>
		)
	}
}

function mapStateToProps(store){
	return{
		store
	}
}

function mapDispatchToProps(dispatch){
	return{
		fetchPosts: (data) => dispatch(fetchPosts(data)),
		fetchPost: (data) => dispatch(fetchPost(data)),
		votePost: (data, vote, callback) => dispatch(votePost(data, vote, callback)),
		deletePost: (data, callback) => dispatch(deletePost(data, callback)),
		fetchComments: (data) => dispatch(fetchComments(data)),
		fetchNComments: (data) => dispatch(fetchNComments(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostMain)
