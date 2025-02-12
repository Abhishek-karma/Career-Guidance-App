import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for async actions
export const fetchStudentProfile = createAsyncThunk(
  'student/fetchProfile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/students/profile', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateLocation = createAsyncThunk(
  'student/updateLocation',
  async ({ location, token }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        'http://localhost:5000/api/students/location',
        { location },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerCollege = createAsyncThunk(
  'student/registerCollege',
  async ({ collegeId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/students/register-college',
        { collegeId },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const studentSlice = createSlice({
  name: 'student',
  initialState: {
    student: null,
    location: '',
    colleges: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.student = action.payload;
        state.location = action.payload.locationPreference;
        state.colleges = action.payload.collegePreferences;
      })
      .addCase(fetchStudentProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.location = action.payload.location;
      })
      .addCase(registerCollege.fulfilled, (state, action) => {
        state.colleges.push(action.payload);
      });
  },
});

// Export selectors
export const selectStudent = (state) => state.student.student;
export const selectLocation = (state) => state.student.location;
export const selectColleges = (state) => state.student.colleges;
export const selectStudentStatus = (state) => state.student.status;
export const selectStudentError = (state) => state.student.error;

// Export the reducer
export default studentSlice.reducer;
