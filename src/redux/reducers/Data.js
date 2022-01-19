import * as ActionTypes from '../actionTypes';

export const Data=(
    state={
        isLoading:true,
        errMess:null,
        list:[]
},action)=>{
    switch(action.type){
        case ActionTypes.GET_DATA:
            return {...state,isLoading:false,errMess:null,data:action.payload};
        case ActionTypes.DATA_LOADING:
            return {...state,isLoading:true,errMess:null,data:[]};
        case ActionTypes.DATA_FAILED:
            return {...state,isLoading:false,errMess:action.payload,data:[]};
        case ActionTypes.ADD_DATA:
            return {...state,isLoading:false,errMess:null,data:state.data.concat(action.payload)};
        case ActionTypes.EDIT_DATA:
            return {...state,isLoading:false,errMess:null,data:state.data.map(data=>data.id===action.payload.id?action.payload:data)};
        case ActionTypes.DELETE_DATA:
            return {...state,isLoading:false,errMess:null,data:state.data.filter(data=>data.id!==action.payload.id)};
        default:
            return state;
    }
};