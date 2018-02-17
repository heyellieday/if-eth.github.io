import { createStore } from "redux";
import appReducer from '../reducers';

export default (initialState, options) => {
    return createStore(appReducer, initialState);
};
