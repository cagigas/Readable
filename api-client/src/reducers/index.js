import { combineReducers } from 'redux';
import categories from './categories'
import posts from './posts'
import post from './post'
import comments from './comments'
import comment from './comment'

export default combineReducers({
  categories,
  posts,
  post,
  comments,
  comment
})