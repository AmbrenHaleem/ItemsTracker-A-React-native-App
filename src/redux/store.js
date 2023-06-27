import {configureStore} from '@reduxjs/toolkit';
import preferenceReducer from './preferenceSlice';

export const store = configureStore({
    reducer: {
        preference: preferenceReducer
    },
});