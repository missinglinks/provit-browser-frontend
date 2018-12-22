const initialState = {
    persons: [],
    software: [],
    loading: false,
    error: null
}

const AgentsReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_AGENTS_BEGIN':
            return {
                ...state, 
                loading: true,
                error: null,
            }
        case 'FETCH_AGENTS_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                persons: action.payload.agents.person,
                software: action.payload.agents.software
            }
        case 'FETCH_AGENTS_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default AgentsReducer