import { FETCH_POSTS, FETCH_NCOMMENTS } from '../actions/type'

const initialPostsState = null

export default function posts (state = initialPostsState, action) {
	
  switch (action.type) {
    case FETCH_POSTS :
		action.data.map((data)=> data.ncomments ? data.ncomments=data.ncomments : data.ncomments=0)
		return action.data
	case FETCH_NCOMMENTS:
		state.map((post)=>{
			if(post.id === action.idParent)
				post.ncomments = action.data
			return post
		})
		return state
    default :
		return state
  }
}
