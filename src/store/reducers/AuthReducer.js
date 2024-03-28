import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogin: null,
    userdata: null
};

const AuthReducer = createSlice({
    name: 'AuthReducer',
    initialState,
    reducers: {
        setIsLogin: (state, action) => {
            state.isLogin = action?.payload.isLogin
        },
        setUserdata: (state, action) => {
            state.userdata = action?.payload.userdata
        },
    },

});

export const { setIsLogin, setUserdata } = AuthReducer.actions;
export default AuthReducer.reducer;