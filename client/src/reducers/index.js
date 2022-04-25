import { combineReducers } from 'redux';

import posts from './posts.js'
//used if we have a bunch of different types of actions
export default combineReducers({posts: posts});