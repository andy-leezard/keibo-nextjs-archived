import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
}

const initialState:AuthState = {
  isAuthenticated: false,
  isLoading: true,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state/* , action */) => {
      state.isAuthenticated = true
    },
    logout: (state/* , action */) => {
      state.isAuthenticated = false
    },
    finishInitialLoad: (state/* , action */) => {
      state.isLoading = false
    },
  },
})

export const { setAuth, logout, finishInitialLoad } = authSlice.actions

export default authSlice.reducer
