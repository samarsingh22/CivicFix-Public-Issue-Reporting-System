import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteComplaint } from '../store/slices/complaintsSlice'
import { 
  MapPin, 
  Calendar, 
  User, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  XCircle,
  Edit,
  Trash2,
  Eye,
  MessageCircle
} from 'lucide-react'

const ComplaintCard = ({ complaint, showActions = true, onEdit }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const [isDeleting, setIsDeleting] = useState(false)

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'in_progress':
        return <AlertTriangle className="h-4 w-4" />
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />
      case 'rejected':
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      setIsDeleting(true)
      try {
        await dispatch(deleteComplaint(complaint.id))
      } catch (error) {
        console.error('Failed to delete complaint:', error)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const canEdit = user && (user.id === complaint.reportedBy.id || user.role === 'admin')
  const canDelete = user && (user.id === complaint.reportedBy.id || user.role === 'admin')

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {complaint.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {complaint.description}
          </p>
        </div>
        
        {/* Status and Priority */}
        <div className="flex flex-col items-end space-y-2 ml-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
            {getStatusIcon(complaint.status)}
            <span className="ml-1 capitalize">{complaint.status.replace('_', ' ')}</span>
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
            {complaint.priority}
          </span>
        </div>
      </div>

      {/* Images */}
      {complaint.images && complaint.images.length > 0 && (
        <div className="mb-4">
          <div className="flex space-x-2 overflow-x-auto">
            {complaint.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Complaint ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
              />
            ))}
          </div>
        </div>
      )}

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <MapPin className="h-4 w-4" />
          <span className="truncate">{complaint.location.address}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(complaint.reportedAt)}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <User className="h-4 w-4" />
          <span>{complaint.reportedBy.name}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <MessageCircle className="h-4 w-4" />
          <span>{complaint.comments?.length || 0} comments</span>
        </div>
      </div>

      {/* Category */}
      <div className="mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
          {complaint.category}
        </span>
      </div>

      {/* Assigned To */}
      {complaint.assignedTo && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <span className="font-medium">Assigned to:</span> {complaint.assignedTo.name}
            {complaint.assignedTo.department && (
              <span className="text-blue-600 dark:text-blue-300"> ({complaint.assignedTo.department})</span>
            )}
          </p>
        </div>
      )}

      {/* Actions */}
      {showActions && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <Link
              to={`/complaint/${complaint.id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Link>
            
            {canEdit && (
              <button
                onClick={() => onEdit && onEdit(complaint)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
            )}
          </div>

          {canDelete && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default ComplaintCard 