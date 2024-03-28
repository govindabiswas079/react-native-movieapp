import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './reducers/AuthReducer';
import SnackbarReducer from './reducers/SnackbarReducer';

export const store = configureStore({
    reducer: {
        Auth: AuthReducer,
        Snacknotify: SnackbarReducer,
    },
});