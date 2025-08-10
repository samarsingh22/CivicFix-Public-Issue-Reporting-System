// Application Constants
export const APP_NAME = 'CivicFix'
export const APP_DESCRIPTION = 'Fix your community, one issue at a time'

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'
export const API_TIMEOUT = 10000

// Google Maps Configuration
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY'

// File Upload Configuration
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const MAX_FILES = 5
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

// Complaint Categories
export const COMPLAINT_CATEGORIES = [
  'Roads',
  'Street Lights',
  'Sanitation',
  'Water Supply',
  'Electricity',
  'Public Transport',
  'Parks & Recreation',
  'Noise Pollution',
  'Air Pollution',
  'Other'
]

// Complaint Statuses
export const COMPLAINT_STATUSES = [
  'pending',
  'in_progress',
  'resolved',
  'rejected'
]

// Complaint Priorities
export const COMPLAINT_PRIORITIES = [
  'low',
  'medium',
  'high'
]

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator'
}

// Pagination
export const DEFAULT_PAGE_SIZE = 12
export const MAX_PAGE_SIZE = 50

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'MMM dd, yyyy',
  LONG: 'MMMM dd, yyyy',
  WITH_TIME: 'MMM dd, yyyy HH:mm',
  RELATIVE: 'relative'
}

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'civicfix_auth_token',
  USER_PREFERENCES: 'civicfix_user_preferences',
  THEME: 'civicfix_theme'
}

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unknown error occurred.'
}

// Success Messages
export const SUCCESS_MESSAGES = {
  COMPLAINT_CREATED: 'Complaint submitted successfully!',
  COMPLAINT_UPDATED: 'Complaint updated successfully!',
  COMPLAINT_DELETED: 'Complaint deleted successfully!',
  COMMENT_ADDED: 'Comment added successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!'
}

// Validation Rules
export const VALIDATION_RULES = {
  TITLE_MIN_LENGTH: 5,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MIN_LENGTH: 20,
  DESCRIPTION_MAX_LENGTH: 1000,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50
}

// Map Configuration
export const MAP_CONFIG = {
  DEFAULT_CENTER: { lat: 40.7128, lng: -74.0060 }, // New York City
  DEFAULT_ZOOM: 12,
  MIN_ZOOM: 8,
  MAX_ZOOM: 18
}

// Theme Configuration
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
}

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
}

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  COMPLAINTS: '/complaints',
  REPORT: '/report',
  MAP: '/map',
  COMPLAINT_DETAIL: '/complaint/:id',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  HELP: '/help',
  ABOUT: '/about'
} 