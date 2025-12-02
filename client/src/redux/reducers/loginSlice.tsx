import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isLoggedIn: boolean;
  email: string;
  token: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  email: "",
  token: null
};

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; token: string }>) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.token = action.payload.token;
      
      // Store token in localStorage for persistence
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('userEmail', action.payload.email);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = "";
      state.token = null;
      
      // Clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
    },
    initializeAuth: (state) => {
      // Check if user is already logged in (on app refresh)
      const token = localStorage.getItem('authToken');
      const email = localStorage.getItem('userEmail');
      
      if (token && email) {
        state.isLoggedIn = true;
        state.email = email;
        state.token = token;
      }
    }
  }
});

export const { login, logout, initializeAuth } = loginSlice.actions;
export default loginSlice.reducer;