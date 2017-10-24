import React, { Component } from 'react'
import { connect } from 'react-redux'

class NavBar extends Component {
		
	render() {
		const { categories } = this.props.store
		
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<a className="nav-link" onClick={() => this.props.selectCategory("NONE")}> ALL</a>
						</li>
						{categories && categories.map((category) => (
							<li key={category.name} className="nav-item active">
								<a className="nav-link" onClick={() => {this.props.selectCategory(category.name.toUpperCase());this.props.history.push('/' + category.name.toUpperCase())}}> {category.name.toUpperCase()}</a>
							</li>					
						))}
					</ul>
				</div>
			</nav>
		)
  }
}

function mapStateToProps(store){
	return{
		store
	}
}

export default connect(mapStateToProps)(NavBar)
