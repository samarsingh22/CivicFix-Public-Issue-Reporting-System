import axios from 'axios'

// Mock data for development
const mockUsers = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123',
    name: 'John Doe',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
]

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const authAPI = {
  async login(credentials) {
    await delay(1000) // Simulate network delay
    
    const user = mockUsers.find(u => 
      u.email === credentials.email && u.password === credentials.password
    )
    
    if (!user) {
      throw new Error('Invalid credentials')
    }
    
    const { password, ...userWithoutPassword } = user
    const token = `mock-jwt-token-${user.id}-${Date.now()}`
    
    return {
      data: {
        user: userWithoutPassword,
        token
      }
    }
  },

  async register(userData) {
    await delay(1000)
    
    // Check if user already exists
    if (mockUsers.find(u => u.email === userData.email)) {
      throw new Error('User already exists')
    }
    
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
    }
    
    mockUsers.push(newUser)
    
    const { password, ...userWithoutPassword } = newUser
    const token = `mock-jwt-token-${newUser.id}-${Date.now()}`
    
    return {
      data: {
        user: userWithoutPassword,
        token
      }
    }
  },

  async logout() {
    await delay(500)
    // In a real app, you might want to invalidate the token on the server
    return { data: { message: 'Logged out successfully' } }
  },

  async getCurrentUser(token) {
    await delay(500)
    
    // Extract user ID from mock token
    const userId = parseInt(token.split('-')[3])
    const user = mockUsers.find(u => u.id === userId)
    
    if (!user) {
      throw new Error('Invalid token')
    }
    
    const { password, ...userWithoutPassword } = user
    
    return {
      data: userWithoutPassword
    }
  }
} 