import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import complaintsReducer from './slices/complaintsSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    complaints: complaintsReducer,
    ui: uiReducer,
  },
}) 