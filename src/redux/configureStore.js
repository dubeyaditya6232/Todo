import {createStore} from 'redux'
import {Data} from './reducers/Data';

export const configureStore = () =>{
    const store = createStore(Data);
    return store;
}