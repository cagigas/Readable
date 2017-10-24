import React, { Component } from 'react'
import { fetchPosts, fetchPost } from '../actions'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import PostMain from './PostMain'

class Main extends Component {
	
	state = {
		category: 'NONE'
	}
	
	componentWillMount(){
		this.props.fetchPosts('VA')
		this.setState({category: this.props.match.params.category ? this.props.match.params.category.toUpperCase() : 'NONE'})
	}
		
	selectCategory = (category) => {
		this.setState({category: category})
	}
	
	render() {
		const { posts } = this.props.store

		return (
			<div>
				<NavBar 
					history={this.props.history}
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
						<PostMain 
							history={this.props.history}
							key={post.id}
							post={post}
						/>
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
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
