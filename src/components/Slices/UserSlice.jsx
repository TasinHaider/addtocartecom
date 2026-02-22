import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'userInfo',
    initialState: {
        value: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
    reducers: {
        loggedIn: (state, action) => {
            state.value = action.payload;
        },
    }
})

// Action creators are generated for each case reducer function
export const { loggedIn } = userSlice.actions

export default userSlice.reducer