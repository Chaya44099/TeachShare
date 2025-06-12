import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import type { User } from "../Models/User"

const API_URL = import.meta.env.REACT_APP_API_BASE_URL
const apiUrl = `${API_URL}/api/User`;

// const apiUrl = "http://localhost:5103/api/User"

export const loginUser = createAsyncThunk("auth/login", async (userData: { password: string; email: string }) => {
  const loginData = {
    email: userData.email,
    passwordHash: userData.password,
  }

  const response = await axios.post(`${apiUrl}/login`, loginData)
  console.log(response.data)

  return response.data as { user: User; token: string }
})

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: {
    // username: string
    email: string
    password: string
    firstName: string
    lastName: string
  }) => {
    const registerData = {
    //   username: userData.username,
      email: userData.email,
      passwordHash: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
    }

    const response = await axios.post(`${apiUrl}/register`, registerData)
    return response.data as { user: User; token: string }
  },
)

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      sessionStorage.removeItem("authToken")
      sessionStorage.removeItem("user")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        sessionStorage.setItem("authToken", action.payload.token)
        sessionStorage.setItem("user", JSON.stringify(action.payload.user))
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        sessionStorage.setItem("authToken", action.payload.token)
        sessionStorage.setItem("user", JSON.stringify(action.payload.user))
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
