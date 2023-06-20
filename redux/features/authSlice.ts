import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
}

const initialState = {
  isAuthenticated: false,
  isLoading: true,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true
    },
    logout: (state, action) => {
      state.isAuthenticated = false
    },
    finishInitialLoad: (state, action) => {
      state.isLoading = false
    },
  },
})

export const { setAuth, logout, finishInitialLoad } = authSlice.actions
/** is authSlice = default export is the reducer itself */
export default authSlice.reducer
