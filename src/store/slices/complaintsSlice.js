import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { complaintsAPI } from '../../services/complaintsAPI'

// Async thunks
export const fetchComplaints = createAsyncThunk(
  'complaints/fetchComplaints',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await complaintsAPI.getComplaints(filters)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch complaints')
    }
  }
)

export const createComplaint = createAsyncThunk(
  'complaints/createComplaint',
  async (complaintData, { rejectWithValue }) => {
    try {
      const response = await complaintsAPI.createComplaint(complaintData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create complaint')
    }
  }
)

export const updateComplaint = createAsyncThunk(
  'complaints/updateComplaint',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await complaintsAPI.updateComplaint(id, data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update complaint')
    }
  }
)

export const deleteComplaint = createAsyncThunk(
  'complaints/deleteComplaint',
  async (id, { rejectWithValue }) => {
    try {
      await complaintsAPI.deleteComplaint(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete complaint')
    }
  }
)

const initialState = {
  complaints: [],
  userComplaints: [],
  currentComplaint: null,
  isLoading: false,
  error: null,
  filters: {
    status: 'all',
    category: 'all',
    location: '',
  },
}

const complaintsSlice = createSlice({
  name: 'complaints',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCurrentComplaint: (state, action) => {
      state.currentComplaint = action.payload
    },
    clearCurrentComplaint: (state) => {
      state.currentComplaint = null
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        status: 'all',
        category: 'all',
        location: '',
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch complaints
      .addCase(fetchComplaints.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.isLoading = false
        state.complaints = action.payload
      })
      .addCase(fetchComplaints.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Create complaint
      .addCase(createComplaint.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createComplaint.fulfilled, (state, action) => {
        state.isLoading = false
        state.complaints.unshift(action.payload)
        state.userComplaints.unshift(action.payload)
      })
      .addCase(createComplaint.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update complaint
      .addCase(updateComplaint.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateComplaint.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.complaints.findIndex(c => c.id === action.payload.id)
        if (index !== -1) {
          state.complaints[index] = action.payload
        }
        const userIndex = state.userComplaints.findIndex(c => c.id === action.payload.id)
        if (userIndex !== -1) {
          state.userComplaints[userIndex] = action.payload
        }
      })
      .addCase(updateComplaint.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Delete complaint
      .addCase(deleteComplaint.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteComplaint.fulfilled, (state, action) => {
        state.isLoading = false
        state.complaints = state.complaints.filter(c => c.id !== action.payload)
        state.userComplaints = state.userComplaints.filter(c => c.id !== action.payload)
      })
      .addCase(deleteComplaint.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { 
  clearError, 
  setCurrentComplaint, 
  clearCurrentComplaint, 
  setFilters, 
  clearFilters 
} = complaintsSlice.actions

export default complaintsSlice.reducer 