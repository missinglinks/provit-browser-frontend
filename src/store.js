import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import ConfigReducer from './config/reducers'
import HomeReducer from './home/reducers'
import DirectoryReducer from './directory/reducers'
import AgentsReducer from './agents/reducers'

const reducers = combineReducers({
    home: HomeReducer,
    config: ConfigReducer,
    directory: DirectoryReducer,
    agents: AgentsReducer
})

const store = createStore(
    reducers,
    applyMiddleware(thunk)
)

export default store