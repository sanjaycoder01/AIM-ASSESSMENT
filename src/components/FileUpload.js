import React, { useState } from 'react'
import Papa from 'papaparse'
import { useDispatch } from 'react-redux'
import { setCsvData } from '../redux/dataSlice'
import { CheckCircle, XCircle } from 'lucide-react'

const FileUpload = () => {
  const dispatch = useDispatch()
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0]
    if (uploadedFile && uploadedFile.type === 'text/csv') {
      setError(null) // Reset error
      setFile(uploadedFile) // Set file name

      // Parse the CSV file
      Papa.parse(uploadedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          // Dispatch the parsed data and filename to Redux store
          dispatch(
            setCsvData({
              data: result.data,
              fileName: uploadedFile.name, // Send filename along with data
            }),
          )
        },
        error: () => {
          setError('Error parsing file!')
          setFile(null) // Reset file on error
        },
      })
    } else {
      setError('Please upload a valid CSV file.')
      setFile(null) // Reset file on invalid file type
    }
  }

  return (
    <div className="p-4">
      {/* File upload area */}
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
        id="csvFileInput"
      />

      <label htmlFor="csvFileInput" className="cursor-pointer">
        {/* Display the file name or upload prompt */}
        {file ? (
          <div className="flex items-center gap-2 text-green-600 mr-[40px]">
            <CheckCircle className="w-5 h-5 ml-7" />
            <span className="font-medium ">{file.name}</span>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">
              Drop your CSV file here
            </p>
            <p className="text-sm text-gray-500 mt-1">or click to browse</p>
          </div>
        )}

        {/* Display error message if any */}
        {error && (
          <div className="flex items-center gap-2 text-red-500 mt-2">
            <XCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
      </label>
    </div>
  )
}

export default FileUpload
