import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import ConfigReducer from './config/reducers'
import HomeReducer from './home/reducers'
import DirectoryReducer from './directory/reducers'
import AgentsReducer from './agents/reducers'
import FileReducer from './file/reducers'

const reducers = combineReducers({
    home: HomeReducer,
    config: ConfigReducer,
    directory: DirectoryReducer,
    agents: AgentsReducer,
    file: FileReducer
})

const store = createStore(
    reducers,
    applyMiddleware(thunk)
)

export default store