import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoading: false,
        isAuthenticated: false,
    },
    reducers: {
        addUser: (state, action) => {
            state.isLoading = true;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
        }
    }
})

export const { addUser } = authSlice.actions;

export default authSlice.reducer