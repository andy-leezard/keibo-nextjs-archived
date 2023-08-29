import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
  someState: any
}

const initialState: AuthState = {
  someState: false,
}

const someSlice = createSlice({
  name: "someSlice",
  initialState,
  reducers: {
    setSomeState: (state, action) => {
      console.log("action payload")
      state.someState = action.payload
    },
  },
})

export const { setSomeState } = someSlice.actions

export default someSlice.reducer
