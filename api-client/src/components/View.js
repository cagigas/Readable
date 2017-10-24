import React, { Component } from 'react'
import { fetchPosts, fetchPost, votePost, deletePost, fetchComments, fetchComment, voteComment, deleteComment } from '../actions'
import { connect } from 'react-redux'

class View extends Component {

	render() {
		const { post, comments } = this.props.store
		
		return (
			<div>
				<div className="card">
					<div className="card-header">
					Post View
					</div>
					<div className="card-body">
						<h4 className="card-title" onClick={() => {this.props.fetchPost(post.id);this.props.history.push('/view/post')}}>{post.title}<span className="badge badge-secondary">{new Date(post.timestamp).toLocaleDateString("en-US")}</span></h4>
						<h6 className="card-subtitle mb-2 text-muted">{post.author}</h6>
						<p className="card-text">{post.body}</p>
						<i onClick={() => {this.props.votePost(post.id, 'upVote', () => {this.props.fetchPost(post.id)})}} className="material-icons">thumb_up</i>&nbsp;
						{post.voteScore > -1
							? <span className="badge badge-success">{post.voteScore}</span>
							: <span className="badge badge-danger">{post.voteScore}</span>
						}
						&nbsp;<i onClick={() => {this.props.votePost(post.id, 'downVote', () => {this.props.fetchPost(post.id)})}} className="material-icons">thumb_down</i>
						<p>Comments: ({comments && comments.length})</p>
						<div className="space-up">
							<a onClick={() => {this.props.fetchPost(post.id); this.props.history.push('/posts/new')}} className="card-link">Edit Post</a>
							<a onClick={() => {this.props.deletePost(post.id, () => {this.props.fetchPosts('VA');this.props.history.push('/')}) }} className="card-link">Delete Post</a> {/*if you write href restart redux store*/}
						</div>
					</div>
				</div>
				<div className="card">
					<div className="card-header">
					Comments
					</div>
					<div className="card-body">
						{comments && comments
							.map((comment) => (
							  <div className="comment" key={comment.id}>
								<h4 className="card-title">{comment.title}<span className="badge badge-secondary">{new Date(comment.timestamp).toLocaleDateString("en-US")}</span></h4>
								<h6 className="card-subtitle mb-2 text-muted">{comment.author}</h6>
								<p className="card-text">{comment.body}</p>
								<i onClick={() => {this.props.voteComment(comment.id, 'upVote', () => {this.props.fetchComments(comment.parentId)})}} className="material-icons">thumb_up</i>&nbsp;
								{comment.voteScore > -1
									? <span className="badge badge-success">{comment.voteScore}</span>
									: <span className="badge badge-danger">{comment.voteScore}</span>
								}
								&nbsp;<i onClick={() => {this.props.voteComment(comment.id, 'downVote', () => {this.props.fetchComments(comment.parentId)})}} className="material-icons">thumb_down</i>
								<div className="space-up">
									<a className="card-link" onClick={() => {this.props.fetchComment(comment.id);this.props.history.push('/comments/new')}}>Edit Comment</a>
									<a className="card-link" onClick={() => {this.props.deleteComment(comment.id, () => {this.props.fetchComments(comment.parentId)}) }}>Delete Comment</a> {/*if you write href restart redux store*/}
								</div>
							  </div>
						))}
					</div>
				</div>
			<button type="button" onClick={() => {this.props.fetchComment(null); this.props.history.push('/comments/new')}} className="btn btn-primary btn-lg btn-block" >New Comment</button>	
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
		fetchComment: (data) => dispatch(fetchComment(data)),
		votePost: (data, vote, callback) => dispatch(votePost(data, vote, callback)),
		deleteComment: (data, callback) => dispatch(deleteComment(data, callback)),
		voteComment: (data, vote, callback) => dispatch(voteComment(data, vote, callback)),
		deletePost: (data, callback) => dispatch(deletePost(data, callback)),
		fetchComments: (data) => dispatch(fetchComments(data)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
