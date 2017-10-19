import React, { Component } from 'react'
import { editComment, fetchComments, createComment } from '../actions'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'

class Comment extends Component {

	handleSubmit = (e) => {
		e.preventDefault()
		const values = serializeForm(e.target, { hash: true })
		
		if(values.id){
			this.props.editComment(values, () => {this.props.fetchComments(values.parentid); this.props.history.push('/view/post')})
		}else{
			this.props.createComment(values, values.parentid)
		}
		this.props.fetchComments(values.parentid)
		this.props.history.push('/view/post')
		
	}

	render() {
		const { post, comment } = this.props.store
		
		return (
		<div className="card">
			<div className="card-header">
			New Comment
			</div>
			<div className="card-body">
				<form onSubmit={this.handleSubmit} className='create-contact-form'>
					<input name="parentid" value={post.id} hidden/>
					{comment && <input name="id" value={comment.id} hidden/>}
					<div className="form-group">
						<label htmlFor="exampleInputAuthor">Author</label>
						{comment && <input name="author" className="form-control" id="exampleInputAuthor" placeholder="Enter Author" defaultValue={comment.author} />}
						{!comment && <input name="author" className="form-control" id="exampleInputAuthor" placeholder="Enter Author" />}
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputBody">Body</label>
						{comment && <textarea name="body" className="form-control" id="exampleInputBody" placeholder="Enter Comment" defaultValue={comment.body} />}
						{!comment && <textarea name="body" className="form-control" id="exampleInputBody" placeholder="Enter Comment"  />}
					</div>
					<button type="submit" className="btn btn-primary">Submit/Edit</button>
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
		editComment: (data, callback) => dispatch(editComment(data, callback)),
		fetchComments: (data) => dispatch(fetchComments(data)),
		createComment: (data, data2, callback) => dispatch(createComment(data, data2, callback))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
