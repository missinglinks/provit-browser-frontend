export const fetchProvBegin = () => ({
    type: 'FETCH_PROV_BEGIN'
})

export const fetchProvSuccess = (prov, agents) => ({
    type: 'FETCH_PROV_SUCCESS',
    payload: { prov, agents }
})

export const fetchProvError = (error) => ({
    type: 'FETCH_PROV_ERROR',
    payload: { error }
})

export const changeCurrentFile = (currentFile) => ({
    type: 'CHANGE_CURRENT_FILE',
    payload: { currentFile }
})

export const changeProvEvent = (provEvent) => ({
    type: 'CHANGE_PROV_EVENT',
    payload: { provEvent }
})