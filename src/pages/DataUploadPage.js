import React, { useState, useCallback } from 'react'
import {
  BarChart,
  Upload,
  ArrowRight,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import FileUpload from '../components/FileUpload'

function DataUploadPage() {
  // State hooks to manage the file upload process
  const [isDragging, setIsDragging] = useState(false) // For handling drag events (when dragging a file)
  const [file, setFile] = useState(null) // To store the selected or dropped file
  const [error, setError] = useState(null) // For error messages related to file validation

  // Handler for drag over event to change the UI when a file is dragged over the drop area
  const handleDragOver = useCallback((e) => {
    e.preventDefault() // Prevent the default behavior of the event
    setIsDragging(true) // Indicate that a file is being dragged
  }, [])

  // Handler for drag leave event to revert UI when the dragged file leaves the drop area
  const handleDragLeave = useCallback((e) => {
    e.preventDefault() // Prevent the default behavior of the event
    setIsDragging(false) // Reset dragging state
  }, [])

  // Function to validate the uploaded file based on type and size
  const validateFile = (file) => {
    // Check if the file is a CSV
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file') // Show error if the file is not CSV
      return false
    }
    // Check if the file size exceeds the limit of 10MB
    if (file.size > 10 * 1024 * 1024) {
      setError('File size should be less than 10MB') // Show error if file is too large
      return false
    }
    return true // Return true if the file is valid
  }

  // Handler for the drop event when a file is dropped into the drop area
  const handleDrop = useCallback((e) => {
    e.preventDefault() // Prevent the default behavior of the event
    setIsDragging(false) // Reset dragging state
    const droppedFile = e.dataTransfer.files[0] // Get the dropped file

    // Validate and set the file if it's valid
    if (validateFile(droppedFile)) {
      setFile(droppedFile) // Set the file to the state
      setError(null) // Clear any previous error messages
    }
  }, [])

  // Handler for file selection through the file input
  const handleFileSelect = useCallback((e) => {
    const selectedFile = e.target.files?.[0] // Get the selected file

    // Validate and set the file if it's valid
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile) // Set the file to the state
      setError(null) // Clear any previous error messages
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16">
      <div className="relative max-w-4xl mx-auto">
        <div className="bg-white/90 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
          <div className="flex flex-col items-center justify-between mb-8 sm:flex-row sm:items-start">
            <div className="text-center sm:text-left mb-6 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Data Upload
              </h1>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                Upload your CSV file to generate beautiful charts and insights
              </p>
            </div>
            {/* Link to the chart page */}
            <Link
              to="/chart"
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base"
            >
              <BarChart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>View Charts</span>
            </Link>
          </div>

          {/* Drop area for file upload */}
          <div
            className={`relative group border-2 border-dashed rounded-lg p-6 sm:p-8 transition-all duration-300 ease-in-out ${
              isDragging
                ? 'border-blue-500 bg-blue-50' // Styling when dragging over the area
                : 'border-gray-300 hover:border-blue-400' // Styling for the default state
            }`}
            onDragOver={handleDragOver} // Bind drag over handler
            onDragLeave={handleDragLeave} // Bind drag leave handler
            onDrop={handleDrop} // Bind drop handler
          >
            {/* Hidden file input */}
            <input
              type="file"
              accept=".csv" // Restrict to CSV files only
              onChange={handleFileSelect} // Handle file selection
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div className="flex flex-col items-center justify-center gap-4">
              {/* Upload icon */}
              <div className="relative">
                <FileUpload className="w-8 h-8 text-blue-600" />
              </div>

              {/* Display file name if a file has been selected */}
              {file && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm ml-5">{file.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Display error message if there's any */}
          {error && (
            <div className="mt-4 text-red-600 text-sm sm:text-base">
              <XCircle className="inline-block w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {error}
            </div>
          )}

          {/* File requirements section */}
          <div className="mt-8 p-4 sm:p-6 bg-blue-50/50 rounded-lg border border-blue-100">
            <h2 className="text-base sm:text-lg font-semibold text-blue-900 mb-2">
              File Requirements
            </h2>
            <ul className="list-disc list-inside text-blue-800 space-y-1 text-sm sm:text-base">
              <li className="">File must be in CSV format</li>
              <li className="">Maximum file size: 10MB</li>
              <li className="">First row should contain column headers</li>
              <li className="">Data should be properly formatted in columns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataUploadPage
