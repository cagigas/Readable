import React, { Component } from 'react'
import { fetchPosts, fetchPost } from '../actions'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import PostMain from './PostMain'
import Menu from './Menu'

class Main extends Component {
		
	componentWillMount(){
		if(!this.props.match.params.category){
			this.props.history.push('/NONE')
		}
		this.props.fetchPosts('VA')
	}
	
	render() {
		const { posts } = this.props

		return (
			<div>
				<Menu 
					match={this.props.match}
					history={this.props.history}/>
				<NavBar 
					history={this.props.history}
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
					.filter((post) => this.props.match.params.category === 'NONE' ? post : post.category.toUpperCase() === this.props.match.params.category)
					.map((post) => (
						<PostMain 
							history={this.props.history}
							key={post.id}
							post={post}
						/>
				))}
				<button type="button" onClick={() => {this.props.history.push('/' + this.props.post.category + '/edit/null')}} className="btn btn-primary btn-lg btn-block" >New Post</button>	
			</div>
		)
	}
}

function mapStateToProps({ posts, post }){
	return { posts, post }
}
export default connect(mapStateToProps, { fetchPosts, fetchPost })(Main)
