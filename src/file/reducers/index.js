const initalState = {
    prov: {},
    agents: [],
    currentFile: "",
    loading: false,
    error: null
}

const FileReducer = (state=initalState, action) => {
    switch (action.type) {
        case 'FETCH_PROV_BEGIN':
            return {
                ...state,
                prov: {},
                agent: [],
                currentFile: "",
                loading: true,
                error: null
            }
        case 'FETCH_PROV_SUCCESS':
            return {
                ...state,
                prov: action.payload.prov,
                agent: action.payload.agents,
                loading: false
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
        default:
            return state
    }
}

export default FileReducer