import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../Models/User';

const apiUrl = "http://localhost:5103/api/User";

export const loginUser = createAsyncThunk('auth/login', async (userData: { password: string; email: string; }) => {
    const loginData = {
        email: userData.email,
        passwordHash: userData.password
    };
    
    const response = await axios.post(`${apiUrl}/login`, loginData);
    console.log(response.data);
    
    return response.data as { user: User; token: string }; // החזרת אובייקט עם משתמש ו-TOKEN
});

export const registerUser = createAsyncThunk('auth/register', async (userData: { 
    username: string; 
    email: string; 
    password: string; 
    firstName: string; 
    lastName: string; 
}) => {
    const registerData = {
        username: userData.username,
        email: userData.email,
        passwordHash: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName
    };
    
    const response = await axios.post(`${apiUrl}/register`, registerData);
    return response.data as { user: User; token: string }; // החזרת אובייקט עם משתמש ו-TOKEN
});

interface AuthState {
    isAuthenticated: boolean;
    user: User | null; 
    token: string | null; // הוספת שדה TOKEN
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null, // הוספת שדה TOKEN
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null; // ניקוי ה-TOKEN
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user; // עדכון המשתמש
              //  state.token = action.payload.token; // עדכון ה-TOKEN
                sessionStorage.setItem('authToken', action.payload.token);
                sessionStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user; // עדכון המשתמש
              //  state.token = action.payload.token; // עדכון ה-TOKEN
                sessionStorage.setItem('authToken', action.payload.token);
                sessionStorage.setItem('user', JSON.stringify(action.payload.user));
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
