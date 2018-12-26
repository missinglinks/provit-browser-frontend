import { fetchProvBegin, fetchProvSuccess, fetchProvError } from '../actions'

export function fetchProv (filepath) {
    return function (dispatch) {
        console.log("fetch prov information")
        dispatch(fetchProvBegin())
        return fetch('http://localhost:5555/file',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },            
            mode: 'cors',
            body: JSON.stringify({ filepath })
            })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                dispatch(fetchProvSuccess(json.prov, json.agents))
                return json.prov
            })
            .catch(error => dispatch(fetchProvError(error)))
    }
} 