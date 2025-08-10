import React from 'react'
import { useSelector } from 'react-redux'
import MapComponent from '../components/MapComponent'

const Map = () => {
  const { complaints } = useSelector(state => state.complaints)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Community Issues Map
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View all reported civic issues on an interactive map
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <MapComponent
          complaints={complaints}
          height="700px"
          onComplaintClick={(complaint) => {
            // Navigate to complaint detail
            window.location.href = `/complaint/${complaint.id}`
          }}
        />
      </div>
    </div>
  )
}

export default Map 