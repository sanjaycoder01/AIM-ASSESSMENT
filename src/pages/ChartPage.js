import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ChartSelector from '../components/ChartSelector'
import ChartRenderer from '../components/ChartRenderer'
import { setCsvData } from '../redux/dataSlice'
import Shimmer from '../components/Shimmer'
const ChartPage = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  // Get csvData from Redux
  const csvData = useSelector((state) => state.data)

  // Simulate data loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false) // Set loading to false after 2 seconds
    }, 2000)

    // Cleanup function
    return () => clearTimeout(timer)
  }, [dispatch])

  // Extract file name from csvData if available
  const fileName = csvData?.fileName || 'No file uploaded'

  return (
    <div className="p-8 ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">Chart Viewer</h1>
        <Link to="/">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Back to Home
          </button>
        </Link>
      </div>

      {/* Display uploaded file name */}
      <div className="mb-4 text-gray-700 p-4 bg-gray-50 rounded-lg shadow-sm">
        <p className="text-lg font-medium">
          <strong className="font-semibold">Uploaded File:</strong> {fileName}
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-500">
            <Shimmer />
          </p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="flex-1">
            <ChartSelector />
          </div>
          <div className="flex-1">
            <ChartRenderer />
          </div>
        </div>
      )}
    </div>
  )
}

export default ChartPage
