import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './src/components/Slices/UserSlice'

export default configureStore({
    reducer: {
        userInfo: userSlice.reducer
    }
})