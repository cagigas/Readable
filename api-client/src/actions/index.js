import axios from 'axios';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POST = 'FETCH_POST'
export const CREATE_POST = 'CREATE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'

export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const FETCH_COMMENT = 'FETCH_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

axios.defaults.headers.common['Authorization'] = 'confidential';

const initiaPostState = {
	author: undefined,
	body: undefined,
	category: undefined,
	deleted: undefined,
	id: undefined,
	timestamp: undefined,
	title: undefined,
	voteScore: undefined	
}

export function fetchPost(id) {
	if(id){	        
		return dispatch => {
			axios.get(`http://localhost:3001/posts/${id}`)
				.then(res => dispatch({
					type: FETCH_POST,
					data: res.data
				}))
		}
	}else return {type: FETCH_POST, data: initiaPostState} 
}
export function fetchComment(id) {
	if(id){	        
		return dispatch => {
			axios.get(`http://localhost:3001/comments/${id}`)
				.then(res => dispatch({
					type: FETCH_COMMENT,
					data: res.data
				}))
		}
	}else return {type: FETCH_COMMENT, data: null} 
}

export function voteComment(id, vote, callback) {
    return dispatch => {
        axios.post(`http://localhost:3001/comments/${id}`, {option: vote})
            .then(res => {
				callback()
				dispatch({
					type: VOTE_POST,
					data: res.data
		})})
    }
}
export function editComment({id, body, author}) {
    const data = {
        id: id,
        timestamp: Date.now(),
        body,
        author
	}
    return dispatch => {
        axios.put(`http://localhost:3001/comments/${id}`, data)
            .then(res =>dispatch({
					type: EDIT_COMMENT,
					data: res.data
				}))
    }
}

export function createComment({ author, body }, parentId) {
		
    const data = {
        id: guid(),
        timestamp: Date.now(),
        parentId,
        body,
        author
    }
		
    return dispatch => {
        axios.post('http://localhost:3001/comments', data)
            .then(res => dispatch({
					type: CREATE_COMMENT,
					data: res.data
			}))
    }
}
export function fetchComments(id) {
	
	return dispatch => {
		axios.get(`http://localhost:3001/posts/${id}/comments`)
			.then(res => dispatch({
				type: FETCH_COMMENTS,
				data: orderBy(res.data, 'VD')
			}))
	}
	
}
export function deleteComment(id, callback) {
    return dispatch => {
        axios.delete(`http://localhost:3001/comments/${id}`)
            .then(res => {
				callback()
				dispatch({
					type: DELETE_COMMENT,
					data: res.data
		})})
    }
}

export function editPost({id, title, body, author, category}) {
    const data = {
        id: id,
        timestamp: Date.now(),
        title,
        body,
        author,
        category
    }
    return dispatch => {
        axios.put(`http://localhost:3001/posts/${id}`, data)
            .then(res => dispatch({
				type: EDIT_POST,
				data: res.data
			}))
    }
}

export function createPost({ title, author, category, body }) {
		
    const data = {
        id: guid(),
        timestamp: Date.now(),
        title,
        body,
        author,
        category
    }
        
    return dispatch => {
        axios.post('http://localhost:3001/posts', data)
            .then(res => dispatch({
				type: CREATE_POST,
				data: res.data
			}))
    }
}

export function deletePost(id, callback) {
    return dispatch => {
        axios.delete(`http://localhost:3001/posts/${id}`)
            .then(res => {
				callback()
				dispatch({
					type: DELETE_POST,
					data: res.data
		})})
    }
}

export function votePost(id, vote, callback) {
    return dispatch => {
        axios.post(`http://localhost:3001/posts/${id}`, {option: vote})
            .then(res => {
				callback()
				dispatch({
					type: VOTE_POST,
					data: res.data
		})})
    }
}

export function fetchCategories () {
		
	return dispatch => {
		axios('http://localhost:3001/categories')
			.then(res => dispatch({	// Thunk async call trick
				type: FETCH_CATEGORIES,
				data: res.data.categories
		}))
	}
}


export function fetchPosts (order) {
	return dispatch => {
		axios('http://localhost:3001/posts')
			.then(res => dispatch({	// Thunk async call trick
				type: FETCH_POSTS,
				data: orderBy(res.data, order)
			}))
	}
}

function orderBy(data, orderBy, filter){

	return data.sort((a,b) => {
		switch (orderBy){
			case 'VA':
				return (a.voteScore > b.voteScore) ? 1 : ((b.voteScore > a.voteScore) ? -1 : 0)
			case 'VD':
				return (a.voteScore < b.voteScore) ? 1 : ((b.voteScore < a.voteScore) ? -1 : 0)
			case 'TA':
				return (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0)
			case 'TD':
				return (a.timestamp < b.timestamp) ? 1 : ((b.timestamp < a.timestamp) ? -1 : 0)
			default:
				return (a.voteScore > b.voteScore) ? 1 : ((b.voteScore > a.voteScore) ? -1 : 0)
	}})
}

function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + s4() + s4() + s4();
  }
