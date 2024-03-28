import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    visible: false,
    variant: "error",
    message: "Unable to process. Try again"
};

const SnackbarReducer = createSlice({
    name: 'SnackbarReducer',
    initialState,
    reducers: {
        setSnackbar: (state, action) => {
            state.visible = action?.payload?.visible
            state.message = action?.payload?.message
            state.variant = action?.payload?.variant
        }
    },

});

export const { setSnackbar } = SnackbarReducer.actions;
export default SnackbarReducer.reducer;