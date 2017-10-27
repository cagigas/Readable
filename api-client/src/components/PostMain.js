import React, { Component } from 'react'
import  * as actions from '../actions'
import { connect } from 'react-redux'

class PostMain extends Component {
	
	componentDidMount(){
		this.props.fetchNComments(this.props.post.id)
		
	}
	render() {

		return (
			<div key={this.props.post.id} className="card">
			  <div className="card-body">
				<h4 className="card-title" onClick={() => {this.props.history.push('/'+this.props.post.category.toUpperCase()+'/'+this.props.post.id)}}>{this.props.post.title}<span className="badge badge-secondary">{new Date(this.props.post.timestamp).toLocaleDateString("en-US")}</span></h4>
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
					<a onClick={() => {this.props.history.push('/'+this.props.post.category.toUpperCase()+'/edit/' + this.props.post.id)}} className="card-link">Edit Post</a>
					<a onClick={() => {this.props.deletePost(this.props.post.id, () => {this.props.fetchPosts('VA')}) }} className="card-link">Delete Post</a> {/*if you write href restart redux store*/}
				</div>
			  </div>
			</div>
		)
	}
}

function mapStateToProps(){
	return {  }
}
export default connect(mapStateToProps, actions)(PostMain)
