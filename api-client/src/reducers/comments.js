import { FETCH_COMMENTS, CREATE_COMMENT, DELETE_COMMENT, VOTE_COMMENT } from '../actions'

const initialCategoriesState = null

export default function categories (state = initialCategoriesState, action) {
	switch (action.type) {
		case FETCH_COMMENTS:
			return action.data
		case CREATE_COMMENT:
			return state
		case DELETE_COMMENT:
			return state
		case VOTE_COMMENT:
			return state
		default :
			return state
	}
}
