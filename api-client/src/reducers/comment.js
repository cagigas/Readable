import { FETCH_COMMENT, EDIT_COMMENT } from '../actions'

const initialCategoriesState = null

export default function comment (state = initialCategoriesState, action) {
  switch (action.type) {
    case FETCH_COMMENT :
		return action.data
    case EDIT_COMMENT :
		return state
    default :
		return state
  }
}
