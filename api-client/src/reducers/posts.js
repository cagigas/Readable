import { FETCH_POSTS } from '../actions'

const initialPostsState = null

export default function posts (state = initialPostsState, action) {
  switch (action.type) {
    case FETCH_POSTS :
		return action.data
    default :
		return state
  }
}
