import React, { Component } from 'react'
import { createPost, editPost } from '../actions'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'

class Post extends Component {
	
	handleSubmit = (e) => {
		e.preventDefault()
		const values = serializeForm(e.target, { hash: true })
		console.log(values)
		if(values.id){
			this.props.editPost(values)
		}else
			this.props.createPost(values)
		this.props.history.push('/')//redirect
	}
		
	render() {
		const { categories, post } = this.props.store
		console.log(post)
		return (
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
						{post.title && <input name="body" className="form-control" id="exampleInputBody" placeholder="Enter Body" defaultValue={post.body} />}
						{!post.title && <input name="body" className="form-control" id="exampleInputBody" placeholder="Enter Body" />}
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputAuthor">Author</label>
						{post.title && <input name="author" className="form-control" id="exampleInputAuthor" placeholder="Enter Author" defaultValue={post.author} />}
						{!post.title && <input name="author" className="form-control" id="exampleInputAuthor" placeholder="Enter Author" />}
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputCategory">Category</label>
						<select name="category" className="form-control" id="exampleInputCategory">
							{categories && categories.map((category) => (
								<option key={category}>{category.name.toUpperCase()}</option>
							))}
						</select>
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
					<button type="submit" onClick={() => this.props.history.push('/')} className="btn btn-secondary">Cancel</button>
				</form>
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
		createPost: (data) => dispatch(createPost(data)),
		editPost: (data) => dispatch(editPost(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
