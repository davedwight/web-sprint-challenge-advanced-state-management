import axios from 'axios';

export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAIL = "FETCH_FAIL";
export const ADD_SMURF = "ADD_SMURF";
export const SET_ERROR = "SET_ERROR";

const uniqueID = Date.now();

export const fetchStart = () => {
    return({type: FETCH_START});
}

export const fetchSuccess = (smurfs) => {
    return({type: FETCH_SUCCESS, payload: smurfs});
}

export const fetchFail = (error) => {
    return({type: FETCH_FAIL, payload: error});
}

export const addSmurf = (smurf) => {
    return({type: ADD_SMURF, payload: {
        id: uniqueID,
        name: smurf.name,
        position: smurf.position,
        nickname: smurf.nickname,
        description: smurf.description
    }})
}

export const setError = (value) => {
    return({type: SET_ERROR, payload: value})
}

export const fetchSmurfs = () => {
    return (dispatch) => {
        dispatch(fetchStart());
        axios.get('http://localhost:3333/smurfs')
            .then(res => {
                console.log("Axios call inside actions: ", res.data)
                dispatch(fetchSuccess(res.data))
            })
            .catch(err => {
                console.log("Error in axios call in actions: ", err)
                dispatch(fetchFail(err))
            })
    }
}
//Task List:
//1. Add a thunk action called fetchSmurfs that triggers a loading status display in our application, performs an axios call to retrieve smurfs from our server, saves the result of that call to our state and shows an error if one is made.
//2. Add a standard action that allows us to add new smurf (including the name, nickname, position, summary)
//3. Add a standard action that allows us to set the value of the error message slice of state.