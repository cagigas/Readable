import React, { Component } from 'react'
import { fetchPosts, fetchPost, votePost, deletePost, fetchComments } from '../actions'
import { connect } from 'react-redux'
import NavBar from './NavBar'
//import { Link } from 'react-router-dom'

class Main extends Component {
	
	state = {
		category: 'NONE'
	}
	
	componentWillMount(){
		this.props.fetchPosts('VA')
	}
	
	selectCategory = (category) => {
		this.setState({category: category})
	}
	
	render() {
		const { posts } = this.props.store

		return (
			<div>
				<NavBar 
					selectCategory={this.selectCategory}
					/>
				<div className="dropdown">
				  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Dropdown button
				  </button>
				  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
					<a className="dropdown-item" onClick={() => this.props.fetchPosts("VA")}>Votes (Ascending)</a>
					<a className="dropdown-item" onClick={() => this.props.fetchPosts("VD")}>Votes (Descending)</a>
					<a className="dropdown-item" onClick={() => this.props.fetchPosts("TA")}>Time (Ascending)</a>
					<a className="dropdown-item" onClick={() => this.props.fetchPosts("TD")}>Time (Descending)</a>
				  </div>
				</div>

				{posts && posts
					.filter((post) => this.state.category === "NONE" ? post : post.category.toUpperCase() === this.state.category)
					.map((post) => (
						<div key={post.id} className="card">
						  <div className="card-body">
							<h4 className="card-title" onClick={() => {this.props.fetchPost(post.id);this.props.fetchComments(post.id);this.props.history.push('/view/post')}}>{post.title}<span className="badge badge-secondary">{new Date(post.timestamp).toLocaleDateString("en-US")}</span></h4>
							<h6 className="card-subtitle mb-2 text-muted">{post.author}</h6>
							<p className="card-text">{post.body}</p>
							<i onClick={() => {this.props.votePost(post.id, 'upVote', () => {this.props.fetchPosts('VA')})}} className="material-icons">thumb_up</i>&nbsp;
							{post.voteScore > -1
								? <span className="badge badge-success">{post.voteScore}</span>
								: <span className="badge badge-danger">{post.voteScore}</span>
							}
							&nbsp;<i onClick={() => {this.props.votePost(post.id, 'downVote', () => {this.props.fetchPosts('VA')})}} className="material-icons">thumb_down</i>
							<div className="space-up">
								<a onClick={() => {this.props.fetchPost(post.id); this.props.history.push('/posts/new')}} className="card-link">Edit Post</a>
								<a onClick={() => {this.props.deletePost(post.id, () => {this.props.fetchPosts('VA')}) }} className="card-link">Delete Post</a> {/*if you write href restart redux store*/}
							</div>
						  </div>
						</div>
				))}
					<button type="button" onClick={() => {this.props.fetchPost(null); this.props.history.push('/posts/new')}} className="btn btn-primary btn-lg btn-block" >New Post</button>	
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
		fetchComments: (data) => dispatch(fetchComments(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
