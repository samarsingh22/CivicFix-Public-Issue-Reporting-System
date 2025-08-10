import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ComplaintList from '../components/ComplaintList'
import MapComponent from '../components/MapComponent'
import {
  Map,
  List,
  Plus,
  Filter,
  Search
} from 'lucide-react'

const Complaints = () => {
  const [viewMode, setViewMode] = useState('list')
  const [showFilters, setShowFilters] = useState(true)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Community Issues
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse and track civic issues in your community
          </p>
        </div>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'map'
                  ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Map className="h-5 w-5" />
            </button>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-md transition-colors duration-200 ${
              showFilters
                ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
            title="Toggle filters"
          >
            <Filter className="h-5 w-5" />
          </button>

          {/* Report New Issue Button */}
          <Link
            to="/report"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
          >
            <Plus className="h-5 w-5 mr-2" />
            Report Issue
          </Link>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'list' ? (
        <ComplaintList
          title="All Community Issues"
          showFilters={showFilters}
          showSearch={true}
          showActions={true}
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <MapComponent
            complaints={[]}
            height="700px"
            onComplaintClick={(complaint) => {
              // Navigate to complaint detail
              window.location.href = `/complaint/${complaint.id}`
            }}
          />
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-12 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-lg p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            If you don't see your issue listed or need to report a new problem, 
            our community is here to help you get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/report"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
            >
              <Plus className="h-5 w-5 mr-2" />
              Report New Issue
            </Link>
            <Link
              to="/help"
              className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200 font-medium"
            >
              Get Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Complaints 