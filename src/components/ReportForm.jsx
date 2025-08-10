import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createComplaint } from '../store/slices/complaintsSlice'
import { 
  MapPin, 
  Camera, 
  X, 
  Upload,
  AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

const ReportForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { isLoading } = useSelector(state => state.complaints)
  const fileInputRef = useRef(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    location: {
      address: '',
      coordinates: null
    }
  })

  const [images, setImages] = useState([])
  const [errors, setErrors] = useState({})
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

  const categories = [
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

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-red-600' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'location.address') {
      setFormData(prev => ({
        ...prev,
        location: { ...prev.location, address: value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`)
        return false
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error(`${file.name} is too large. Maximum size is 5MB`)
        return false
      }
      return true
    })

    if (images.length + validFiles.length > 5) {
      toast.error('Maximum 5 images allowed')
      return
    }

    const newImages = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random()
    }))

    setImages(prev => [...prev, ...newImages])
  }

  const removeImage = (imageId) => {
    setImages(prev => {
      const imageToRemove = prev.find(img => img.id === imageId)
      if (imageToRemove?.preview) {
        URL.revokeObjectURL(imageToRemove.preview)
      }
      return prev.filter(img => img.id !== imageId)
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.category) {
      newErrors.category = 'Category is required'
    }

    if (!formData.location.address.trim()) {
      newErrors.location = 'Location is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      toast.error('Please login to report an issue')
      navigate('/login')
      return
    }

    if (!validateForm()) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const complaintData = {
        ...formData,
        images: images.map(img => img.preview), // In real app, upload to server first
        reportedBy: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }

      await dispatch(createComplaint(complaintData)).unwrap()
      
      toast.success('Complaint submitted successfully!')
      navigate('/my-complaints')
    } catch (error) {
      toast.error(error.message || 'Failed to submit complaint')
    }
  }

  const openLocationModal = () => {
    setIsLocationModalOpen(true)
  }

  const closeLocationModal = () => {
    setIsLocationModalOpen(false)
  }

  const handleLocationSelect = (address, coordinates) => {
    setFormData(prev => ({
      ...prev,
      location: { address, coordinates }
    }))
    closeLocationModal()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Report a Civic Issue
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Help improve your community by reporting issues that need attention.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="form-label">
            Issue Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`input-field ${errors.title ? 'border-red-500' : ''}`}
            placeholder="Brief description of the issue"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.title}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="form-label">
            Detailed Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className={`input-field ${errors.description ? 'border-red-500' : ''}`}
            placeholder="Provide detailed information about the issue, including when you noticed it and any relevant context..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.description}
            </p>
          )}
        </div>

        {/* Category and Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="form-label">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`input-field ${errors.category ? 'border-red-500' : ''}`}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.category}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="priority" className="form-label">
              Priority Level
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="input-field"
            >
              {priorities.map(priority => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="form-label">
            Location *
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              name="location.address"
              value={formData.location.address}
              onChange={handleInputChange}
              className={`input-field flex-1 ${errors.location ? 'border-red-500' : ''}`}
              placeholder="Enter the address or location of the issue"
            />
            <button
              type="button"
              onClick={openLocationModal}
              className="btn-secondary px-4"
            >
              <MapPin className="h-4 w-4" />
            </button>
          </div>
          {errors.location && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.location}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="form-label">
            Photos (Optional)
          </label>
          <div className="space-y-4">
            {/* Upload Button */}
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, GIF up to 5MB (max 5 images)
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.preview}
                      alt="Preview"
                      className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </form>

      {/* Location Modal - This would integrate with Google Maps */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Select Location
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Google Maps integration would go here. For now, please enter the address manually.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={closeLocationModal}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReportForm 