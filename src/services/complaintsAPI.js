// Mock data for development
const mockComplaints = [
  {
    id: 1,
    title: 'Pothole on Main Street',
    description: 'Large pothole causing traffic issues and potential damage to vehicles',
    category: 'Roads',
    status: 'pending',
    priority: 'high',
    location: {
      address: '123 Main Street, Downtown',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=300&fit=crop'
    ],
    reportedBy: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    },
    reportedAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    assignedTo: null,
    comments: [
      {
        id: 1,
        text: 'This has been reported multiple times',
        author: 'John Doe',
        timestamp: '2024-01-15T10:30:00Z'
      }
    ]
  },
  {
    id: 2,
    title: 'Broken Street Light',
    description: 'Street light not working for the past week, making the area unsafe at night',
    category: 'Street Lights',
    status: 'in_progress',
    priority: 'medium',
    location: {
      address: '456 Oak Avenue, Westside',
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop'
    ],
    reportedBy: {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    reportedAt: '2024-01-14T15:45:00Z',
    updatedAt: '2024-01-16T09:15:00Z',
    assignedTo: {
      id: 3,
      name: 'City Maintenance Team',
      department: 'Public Works'
    },
    comments: [
      {
        id: 2,
        text: 'Work order has been created',
        author: 'City Maintenance Team',
        timestamp: '2024-01-16T09:15:00Z'
      }
    ]
  },
  {
    id: 3,
    title: 'Garbage Collection Issue',
    description: 'Garbage not being collected regularly in the neighborhood',
    category: 'Sanitation',
    status: 'resolved',
    priority: 'low',
    location: {
      address: '789 Pine Street, Eastside',
      coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    images: [],
    reportedBy: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    },
    reportedAt: '2024-01-10T08:20:00Z',
    updatedAt: '2024-01-13T14:30:00Z',
    assignedTo: {
      id: 4,
      name: 'Sanitation Department',
      department: 'Public Works'
    },
    comments: [
      {
        id: 3,
        text: 'Issue has been resolved. New schedule implemented.',
        author: 'Sanitation Department',
        timestamp: '2024-01-13T14:30:00Z'
      }
    ]
  }
]

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const complaintsAPI = {
  async getComplaints(filters = {}) {
    await delay(800)
    
    let filteredComplaints = [...mockComplaints]
    
    if (filters.status && filters.status !== 'all') {
      filteredComplaints = filteredComplaints.filter(c => c.status === filters.status)
    }
    
    if (filters.category && filters.category !== 'all') {
      filteredComplaints = filteredComplaints.filter(c => c.category === filters.category)
    }
    
    if (filters.location) {
      filteredComplaints = filteredComplaints.filter(c => 
        c.location.address.toLowerCase().includes(filters.location.toLowerCase())
      )
    }
    
    return {
      data: filteredComplaints
    }
  },

  async getComplaintById(id) {
    await delay(500)
    
    const complaint = mockComplaints.find(c => c.id === parseInt(id))
    
    if (!complaint) {
      throw new Error('Complaint not found')
    }
    
    return {
      data: complaint
    }
  },

  async createComplaint(complaintData) {
    await delay(1000)
    
    const newComplaint = {
      id: mockComplaints.length + 1,
      ...complaintData,
      status: 'pending',
      reportedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
      assignedTo: null
    }
    
    mockComplaints.unshift(newComplaint)
    
    return {
      data: newComplaint
    }
  },

  async updateComplaint(id, updateData) {
    await delay(800)
    
    const index = mockComplaints.findIndex(c => c.id === parseInt(id))
    
    if (index === -1) {
      throw new Error('Complaint not found')
    }
    
    const updatedComplaint = {
      ...mockComplaints[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    
    mockComplaints[index] = updatedComplaint
    
    return {
      data: updatedComplaint
    }
  },

  async deleteComplaint(id) {
    await delay(500)
    
    const index = mockComplaints.findIndex(c => c.id === parseInt(id))
    
    if (index === -1) {
      throw new Error('Complaint not found')
    }
    
    mockComplaints.splice(index, 1)
    
    return {
      data: { message: 'Complaint deleted successfully' }
    }
  },

  async getUserComplaints(userId) {
    await delay(600)
    
    const userComplaints = mockComplaints.filter(c => c.reportedBy.id === parseInt(userId))
    
    return {
      data: userComplaints
    }
  }
} 