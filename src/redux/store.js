import {compose, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage: storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = compose(applyMiddleware(thunk, logger))(createStore)(persistedReducer)

persistStore(store, () => {})

export default store
