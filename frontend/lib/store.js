import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filterReducer from './features/filterReducer';
import userReducer from './features/userReducer';

const rootReducer = combineReducers({
    filter: filterReducer,
    user: userReducer,
});

export const store = configureStore({
    reducer: rootReducer
});