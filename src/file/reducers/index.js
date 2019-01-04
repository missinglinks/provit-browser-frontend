const initalState = {
    prov: {},
    agents: [],
    currentFile: "",
    currentProvEvent: "",
    loading: false,
    error: null,
    updateNetwork: false
}

const FileReducer = (state=initalState, action) => {
    switch (action.type) {
        case 'FETCH_PROV_BEGIN':
            return {
                ...state,
                prov: {},
                agent: [],
                currentFile: "",
                currentProvEvent: "",
                loading: true,
                error: null
            }
        case 'FETCH_PROV_SUCCESS':
            return {
                ...state,
                prov: action.payload.prov,
                agent: action.payload.agents,
                currentProvEvent: action.payload.prov.uri,
                loading: false,
                updateNetwork: true
            }
        case 'FETCH_PROV_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case 'CHANGE_CURRENT_FILE':
            return {
                ...state,
                currentFile: action.payload.currentFile
            }
        case 'CHANGE_PROV_EVENT':
            return {
                ...state,
                currentProvEvent: action.payload.currentProvEvent
            }
        case 'NETWORK_UPDATED':
            return {
                ...state,
                updateNetwork: false
            }
        default:
            return state
    }
}

export default FileReducer