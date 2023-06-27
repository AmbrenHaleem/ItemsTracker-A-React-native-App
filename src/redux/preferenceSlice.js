import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allowDelete : true
}
export const preferenceSlice = createSlice({
    name: 'preference',
    initialState,
    reducers: {
        toggleAllowDelete: (state) => {
           // console.log('toggle allow delete');
            state.allowDelete = !state.allowDelete;
        }
    }
});

export const {toggleAllowDelete} = preferenceSlice.actions;
export default preferenceSlice.reducer;