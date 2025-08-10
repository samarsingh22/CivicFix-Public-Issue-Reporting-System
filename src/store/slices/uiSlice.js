import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  darkMode: localStorage.getItem('darkMode') === 'true' || 
             (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches),
  sidebarOpen: false,
  notifications: [],
  loadingStates: {},
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
      localStorage.setItem('darkMode', state.darkMode)
      // Apply dark mode to document
      if (state.darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload
      localStorage.setItem('darkMode', state.darkMode)
      if (state.darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      })
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      )
    },
    setLoadingState: (state, action) => {
      const { key, isLoading } = action.payload
      state.loadingStates[key] = isLoading
    },
    clearLoadingStates: (state) => {
      state.loadingStates = {}
    },
  },
})

export const { 
  toggleDarkMode, 
  setDarkMode, 
  toggleSidebar, 
  setSidebarOpen, 
  addNotification, 
  removeNotification, 
  setLoadingState, 
  clearLoadingStates 
} = uiSlice.actions

export default uiSlice.reducer 