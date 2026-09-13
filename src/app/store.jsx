
import authReducer from '../features/auth/state/authSlice'
import themeReducer from '../features/auth/state/themeSlice'
import { configureStore, } from '@reduxjs/toolkit'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer
    }
})