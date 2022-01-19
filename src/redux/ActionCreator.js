import * as ActionTypes from './actionTypes';
import axios from 'axios';
const baseURL='http://localhost:3000';

export const fetchData=()=>(dispatch)=>{
    dispatch(dataLoading(true));
    return axios.get(baseURL+'/data')
    .then(response=>{
        dispatch(dataSuccess(response.data));
    },(error)=>{console.log(error);dispatch(dataFailed(error.message))})
    .catch(error=>{console.log(error);dispatch(dataFailed(error.message))});
};

const dataLoading = () => ({
    type: ActionTypes.DATA_LOADING,
});

const dataSuccess = (data) => ({
    type: ActionTypes.GET_DATA,
    payload: data,
});

const dataFailed = (errMess) => ({
    type: ActionTypes.DATA_FAILED,
    payload: errMess,
});