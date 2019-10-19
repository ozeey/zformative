import { createEpicMiddleware } from 'redux-observable'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { persistedState, saveState } from './persistedStore.js'
import Network from '../lib/net/network'
import { isLocalHosted, isDevHosted } from '../lib/system/environment'

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  ((isLocalHosted || isDevHosted) && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose


export default function storeFactory(epic, reducer) {

    const epicMiddleware = createEpicMiddleware({
      dependencies: { network: new Network() },
    })

    const middleware = applyMiddleware(epicMiddleware)

    const store = createStore(
      combineReducers({
        root: reducer,
      }),
      persistedState,
      composeEnhancers(middleware)
    )
  
    store.subscribe(() => {
      saveState(store.getState())
    })
  
    epicMiddleware.run(epic)
  
    return store
}
  