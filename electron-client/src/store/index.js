import { combineReducers } from 'redux'
import { reducer as userReducer } from './userReducer'
import { reducer as flowerReducer } from './flowerReducer.js'

export default combineReducers({
    User: userReducer,
    Flowers: flowerReducer
})