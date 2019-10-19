import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import csrfEpic from './csrf/epic'
import csrf from './csrf/redux'
import articlesEpic from './articles/epic'
import articles from './articles/redux'
import storeFactory from './storeFactory'
const rootEpic = combineEpics(csrfEpic, articlesEpic)
const appReducer = combineReducers({ csrf, articles })

const rootReducer = (state, action) => {
    return appReducer(state, action)
}
  
export default function configureStore() {
    return storeFactory(rootEpic, rootReducer)
}
  