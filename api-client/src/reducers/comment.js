import { FETCH_COMMENT,FETCH_NCOMMENTS, EDIT_COMMENT } from '../actions/type'

const initialCategoriesState = null

export default function comment (state = initialCategoriesState, action) {
  switch (action.type) {
    case FETCH_COMMENT :
		return action.data
    case EDIT_COMMENT :
		return state
	case FETCH_NCOMMENTS:
		return action.data
    default :
		return state
  }
}
