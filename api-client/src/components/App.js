import React, { Component } from 'react'
//import logo from './logo.svg'
import './App.css'
import { fetchCategories, fetchPosts } from '../actions'
import { connect } from 'react-redux'
import Main from './Main'
import Post from './Post'
import View from './View'
import Comment from './Comment'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
	
	componentWillMount(){
		this.props.fetchCategories()
		this.props.fetchPosts('VA', 'NONE')
	}
	
	render() {		
		return (
			<BrowserRouter>
				<div className="container">
					<Switch>
						<Route path="/" exact component={Main} />
						<Route path="/posts/new" exact component={Post} />
						<Route path="/view/post" exact component={View} />
						<Route path="/comments/new" exact component={Comment} />
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
		fetchCategories: (data) => dispatch(fetchCategories(data)),//Get Categories and posts here	
		fetchPosts: (data) => dispatch(fetchPosts(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
