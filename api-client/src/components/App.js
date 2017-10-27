import React, { Component } from 'react'
//import logo from './logo.svg'
import './App.css'
import { connect } from 'react-redux'
import Main from './Main'
import Post from './Post'
import View from './View'
import Comment from './Comment'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { fetchCategories } from '../actions'

class App extends Component {
	
	componentWillMount(){
		this.props.fetchCategories()
	}
	render() {		
		return (
			<BrowserRouter>
				<div className="container">
					<Switch>
						<Route path="/" exact component={Main} />
						<Route path="/:category" exact component={Main} />
						<Route path="/:category/:post_id" exact component={View} />
						<Route path="/:category/edit/:post_id" exact component={Post} />
						<Route path="/:category/:post_id/edit/:comment_id" exact component={Comment} />
					</Switch>
				</div>
			</BrowserRouter>
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
		fetchCategories: (data) => dispatch(fetchCategories(data))//Get Categories and posts here	
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
