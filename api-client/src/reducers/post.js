import { FETCH_POST, EDIT_POST, DELETE_POST, VOTE_POST } from '../actions/type'

const initialCategoriesState = {
	author: undefined,
	body: undefined,
	category: undefined,
	deleted: undefined,
	id: undefined,
	timestamp: undefined,
	title: undefined,
	voteScore: undefined	
}

export default function post (state = initialCategoriesState, action) {

	if(!action.data) return state //In case id was wrong or null
	switch (action.type) {
		case FETCH_POST:
			return action.data
		case EDIT_POST:
		case DELETE_POST:
		case VOTE_POST:
		default :
			return state
	}
}
