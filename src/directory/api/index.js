import { fetchFileListBegin, fetchFileListSuccess, fetchFileListError } from '../actions'

export function fetchFileList (directory) {
    return function (dispatch) {
        console.log("fetch filelist")
        dispatch(fetchFileListBegin())
        return fetch('http://localhost:5555/directory',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },            
            mode: 'cors',
            body: JSON.stringify({ directory })
            })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                dispatch(fetchFileListSuccess(json.files))
                return json.files
            })
            .catch(error => dispatch(fetchFileListError(error)))
    }
} 