import React, { Component } from 'react'

class Menu extends Component {
			
	render() {
		return (
			<div aria-label="breadcrumb" role="navigation">
			  <ol className="breadcrumb">
				<li className="breadcrumb-item"><a href='' onClick={() => {this.props.history.push('/NONE')}}>Home</a></li>
				{this.props.match.params.post_id && <li className="breadcrumb-item"><a href="" onClick={() => {this.props.history.push('/NONE/' + this.props.match.params.post_id)}}>Post</a></li> }
			  </ol>
			</div>
		)
	}
}

export default Menu
