import React, { Component } from 'react'
import { connect } from 'react-redux'

class NavBar extends Component {
		
	render() {
		const { categories } = this.props
		
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<a className="nav-link" onClick={() => this.props.history.push('/NONE')}> ALL</a>
						</li>
						{categories && categories.map((category) => (
							<li key={category.name} className="nav-item active">
								<a className="nav-link" onClick={() => {this.props.history.push('/' + category.name.toUpperCase())}}> {category.name.toUpperCase()}</a>
							</li>					
						))}
					</ul>
				</div>
			</nav>
		)
  }
}

function mapStateToProps({ categories }){
	return { categories }
}

export default connect(mapStateToProps)(NavBar)
