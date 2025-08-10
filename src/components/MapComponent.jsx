import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Loader } from '@googlemaps/js-api-loader'
import { 
  MapPin, 
  Filter, 
  Layers, 
  ZoomIn, 
  ZoomOut,
  Navigation
} from 'lucide-react'
import { GOOGLE_MAPS_API_KEY, COMPLAINT_CATEGORIES, COMPLAINT_STATUSES, COMPLAINT_PRIORITIES } from '../utils/constants'

const MapComponent = ({ complaints = [], onComplaintClick, height = '600px' }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const { darkMode } = useSelector(state => state.ui)
  
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [mapType, setMapType] = useState('roadmap')
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    priority: 'all'
  })

  // Google Maps API configuration - now imported from constants
  
  useEffect(() => {
    if (!mapRef.current) return

    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: GOOGLE_MAPS_API_KEY,
          version: 'weekly',
          libraries: ['places', 'geometry']
        })

        const google = await loader.load()
        
        // Default center (New York City)
        const defaultCenter = { lat: 40.7128, lng: -74.0060 }
        
        const map = new google.maps.Map(mapRef.current, {
          center: defaultCenter,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: darkMode ? getDarkMapStyle() : [],
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          zoomControl: false,
        })

        // Custom zoom controls
        const zoomControlDiv = document.createElement('div')
        zoomControlDiv.className = 'custom-zoom-control'
        zoomControlDiv.style.cssText = `
          position: absolute;
          top: 10px;
          right: 10px;
          background: white;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 5px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        `
        
        const zoomInBtn = document.createElement('button')
        zoomInBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>'
        zoomInBtn.style.cssText = `
          display: block;
          width: 30px;
          height: 30px;
          border: none;
          background: white;
          cursor: pointer;
          margin-bottom: 5px;
        `
        zoomInBtn.onclick = () => map.setZoom(map.getZoom() + 1)
        
        const zoomOutBtn = document.createElement('button')
        zoomOutBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>'
        zoomOutBtn.style.cssText = `
          display: block;
          width: 30px;
          height: 30px;
          border: none;
          background: white;
          cursor: pointer;
        `
        zoomOutBtn.onclick = () => map.setZoom(map.getZoom() - 1)
        
        zoomControlDiv.appendChild(zoomInBtn)
        zoomControlDiv.appendChild(zoomOutBtn)
        
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(zoomControlDiv)

        mapInstanceRef.current = map
        setIsMapLoaded(true)
        
        // Add complaints to map
        addComplaintsToMap(map, complaints)
        
      } catch (error) {
        console.error('Error loading Google Maps:', error)
        // Fallback: show error message
        mapRef.current.innerHTML = `
          <div class="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
            <div class="text-center">
              <p class="text-gray-600 dark:text-gray-400 mb-2">Failed to load map</p>
              <p class="text-sm text-gray-500 dark:text-gray-500">Please check your internet connection</p>
            </div>
          </div>
        `
      }
    }

    initMap()
  }, [GOOGLE_MAPS_API_KEY, darkMode])

  useEffect(() => {
    if (isMapLoaded && mapInstanceRef.current) {
      addComplaintsToMap(mapInstanceRef.current, complaints)
    }
  }, [complaints, isMapLoaded])

  const getDarkMapStyle = () => {
    return [
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }]
      }
    ]
  }

  const addComplaintsToMap = (map, complaintsList) => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null))
    markersRef.current = []

    const filteredComplaints = complaintsList.filter(complaint => {
      if (filters.category !== 'all' && complaint.category !== filters.category) return false
      if (filters.status !== 'all' && complaint.status !== filters.status) return false
      if (filters.priority !== 'all' && complaint.priority !== filters.priority) return false
      return true
    })

    filteredComplaints.forEach(complaint => {
      if (!complaint.location?.coordinates) return

      const marker = new google.maps.Marker({
        position: complaint.location.coordinates,
        map: map,
        title: complaint.title,
        icon: getMarkerIcon(complaint.status, complaint.priority),
        animation: google.maps.Animation.DROP
      })

      const infoWindow = new google.maps.InfoWindow({
        content: createInfoWindowContent(complaint)
      })

      marker.addListener('click', () => {
        infoWindow.open(map, marker)
        if (onComplaintClick) {
          onComplaintClick(complaint)
        }
      })

      markersRef.current.push(marker)
    })

    // Fit map to show all markers
    if (markersRef.current.length > 0) {
      const bounds = new google.maps.LatLngBounds()
      markersRef.current.forEach(marker => {
        bounds.extend(marker.getPosition())
      })
      map.fitBounds(bounds)
    }
  }

  const getMarkerIcon = (status, priority) => {
    const colors = {
      pending: '#f59e0b',
      in_progress: '#3b82f6',
      resolved: '#10b981',
      rejected: '#ef4444'
    }

    const prioritySizes = {
      low: 20,
      medium: 25,
      high: 30
    }

    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: colors[status] || '#6b7280',
      fillOpacity: 0.8,
      strokeWeight: 2,
      strokeColor: '#ffffff',
      scale: prioritySizes[priority] || 25
    }
  }

  const createInfoWindowContent = (complaint) => {
    return `
      <div class="p-3 max-w-xs">
        <h3 class="font-semibold text-gray-900 mb-2">${complaint.title}</h3>
        <p class="text-sm text-gray-600 mb-2">${complaint.description.substring(0, 100)}${complaint.description.length > 100 ? '...' : ''}</p>
        <div class="flex items-center justify-between text-xs text-gray-500">
          <span class="capitalize">${complaint.status.replace('_', ' ')}</span>
          <span class="capitalize">${complaint.priority}</span>
        </div>
        <div class="mt-2 text-xs text-gray-500">
          <div>📍 ${complaint.location.address}</div>
          <div>📅 ${new Date(complaint.reportedAt).toLocaleDateString()}</div>
        </div>
      </div>
    `
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
  }

  const handleMapTypeChange = (type) => {
    setMapType(type)
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setMapTypeId(google.maps.MapTypeId[type.toUpperCase()])
    }
  }

  const centerOnUserLocation = () => {
    if (navigator.geolocation && mapInstanceRef.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          mapInstanceRef.current.setCenter(pos)
          mapInstanceRef.current.setZoom(15)
        },
        () => {
          console.log('Error: The Geolocation service failed.')
        }
      )
    }
  }

  return (
    <div className="relative">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        {/* Filter Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 min-w-[200px]">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Categories</option>
                <option value="Roads">Roads</option>
                <option value="Street Lights">Street Lights</option>
                <option value="Sanitation">Sanitation</option>
                <option value="Water Supply">Water Supply</option>
                <option value="Electricity">Electricity</option>
                <option value="Public Transport">Public Transport</option>
                <option value="Parks & Recreation">Parks & Recreation</option>
                <option value="Noise Pollution">Noise Pollution</option>
                <option value="Air Pollution">Air Pollution</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              <select
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="w-full text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Map Type Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center text-sm">
            <Layers className="h-4 w-4 mr-2" />
            Map Type
          </h3>
          <div className="space-y-1">
            {['roadmap', 'satellite', 'hybrid', 'terrain'].map((type) => (
              <button
                key={type}
                onClick={() => handleMapTypeChange(type)}
                className={`w-full text-left px-2 py-1 text-xs rounded ${
                  mapType === type
                    ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Location Button */}
        <button
          onClick={centerOnUserLocation}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          title="Center on my location"
        >
          <Navigation className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Map Container */}
      <div
        ref={mapRef}
        style={{ height }}
        className="w-full rounded-lg border border-gray-200 dark:border-gray-700"
      >
        {!isMapLoaded && (
          <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
            </div>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Legend</h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-gray-700 dark:text-gray-300">Pending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-700 dark:text-gray-300">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-700 dark:text-gray-300">Resolved</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-700 dark:text-gray-300">Rejected</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapComponent 