import React, { Component } from 'react'
import { editComment, fetchComments, createComment, fetchComment, fetchPost } from '../actions'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import Menu from './Menu'

class Comment extends Component {
	
	componentWillMount(){
		this.props.fetchComment(this.props.match.params.comment_id)
		this.props.fetchPost(this.props.match.params.post_id)
	}
	
	handleSubmit = (e) => {
		e.preventDefault()
		const values = serializeForm(e.target, { hash: true })
		
		if(this.props.match.params.comment_id !== 'null'){
			this.props.editComment(values, () => {this.props.fetchComments(values.parentid); this.props.history.push('/'+this.props.post.category.toUpperCase()+'/'+this.props.post.id)})
		}else{
			this.props.createComment(values, values.parentid)
		}
		this.props.history.push('/'+this.props.post.category.toUpperCase()+'/'+values.parentid)
		
	}

	render() {
		const { post, comment } = this.props
		
		return (
		<div>
				<Menu 
					match={this.props.match}
					history={this.props.history}/>
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
		</div>
		)
	}
}

function mapStateToProps({ post, comment }){
	return { post, comment }
}

export default connect(mapStateToProps, { editComment, fetchComments, fetchComment, fetchPost, createComment })(Comment)
