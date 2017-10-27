import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import  * as actions from '../actions'
import Menu from './Menu'

class Post extends Component {
	componentWillMount(){
		this.props.fetchPost(this.props.match.params.post_id)
		this.props.fetchComments(this.props.match.params.post_id)

	}
	handleSubmit = (e) => {
		e.preventDefault()
		const values = serializeForm(e.target, { hash: true })
		if(this.props.match.params.post_id !== 'null'){
			this.props.editPost(values)
		}else
			this.props.createPost(values)
		this.props.history.push('/')//redirect
	}
		
	render() {
		const { categories, post } = this.props
		return (
		<div>
				<Menu 
					match={this.props.match}
					history={this.props.history}/>
			<div className="card">
				<div className="card-header">
				New Post
				</div>
				<div className="card-body">
					<form onSubmit={this.handleSubmit} className='create-contact-form'>
						<input name="id" value={post.id} hidden/>
						<div className="form-group">
							<label htmlFor="exampleInputTitle">Title</label>
							{post.title && <input name="title" className="form-control" id="exampleInputTitle" placeholder="Enter Title" defaultValue={post.title} />}
							{!post.title && <input name="title" className="form-control" id="exampleInputTitle" placeholder="Enter Title" />}
						</div>
						<div className="form-group">
							<label htmlFor="exampleInputBody">Body</label>
							{post.body && <input name="body" className="form-control" id="exampleInputBody" placeholder="Enter Body" defaultValue={post.body} />}
							{!post.body && <input name="body" className="form-control" id="exampleInputBody" placeholder="Enter Body" />}
						</div>
						<div className="form-group">
							<label htmlFor="exampleInputAuthor">Author</label>
							{post.author && <input name="author" className="form-control" id="exampleInputAuthor" placeholder="Enter Author" defaultValue={post.author} />}
							{!post.author && <input name="author" className="form-control" id="exampleInputAuthor" placeholder="Enter Author" />}
						</div>
						<div className="form-group">
							<label htmlFor="exampleInputCategory">Category</label>
							<select name="category" className="form-control" id="exampleInputCategory">
								{categories && categories.map((category) => 
									<option key={category.name}>{category.name.toUpperCase()}</option>
								)}
							</select>
						</div>
						<p>Comments({this.props.comments && this.props.comments.length})</p>
						{!post.title && <button type="submit" className="btn btn-primary">Submit</button>}
						{post.title && <button type="submit" className="btn btn-primary">Edit</button>}
						{post.title && <button type="submit" onClick={() => this.props.deletePost(post.id, () => {this.props.history.push('/NONE')})} className="btn btn-danger">Delete</button>}
						<button type="submit" onClick={() => this.props.history.push('/')} className="btn btn-secondary">Cancel</button>
					</form>
				</div>
			</div>
		</div>
		)
	}
}
function mapStateToProps({ categories, post, comments }){
	return { categories, post, comments }
}

export default connect(mapStateToProps, actions)(Post)
