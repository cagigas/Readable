import { FETCH_CATEGORIES } from '../actions/type'

const initialCategoriesState = null

export default function categories (state = initialCategoriesState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES :
		return action.data
    default :
		return state
  }
}
