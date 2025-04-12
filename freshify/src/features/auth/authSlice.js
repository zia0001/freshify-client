import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async action to login user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      
      // Save token and user data to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user)); // Save user data
      return data; // Return data (user and token)
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Async action to sign up user
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (formData, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Signup failed');
      
      // Optionally, you could log the user in automatically after signup
      return data; // Return data (user details, or token)
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Initial state
const initialState = {
  loading: false,
  user: JSON.parse(localStorage.getItem('user')) || null, // Initialize user from localStorage if available
  error: null,
};

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem('token'); // Remove token from localStorage on logout
      localStorage.removeItem('user');  // Remove user data from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Store user data from the action payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally, you can log the user in automatically after signup
        state.user = action.payload.user; // Store user data from the action payload
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
