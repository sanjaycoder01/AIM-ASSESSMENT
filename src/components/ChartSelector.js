import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChartConfig } from '../redux/dataSlice'
import Papa from 'papaparse'
import {
  BarChart3,
  LineChart,
  PieChart,
  Download,
  Settings,
} from 'lucide-react'

const ChartSelector = () => {
  const { csvData } = useSelector((state) => state.data) // Fetching CSV data from Redux store
  const [chartType, setChartType] = useState('BarChart') // State for selected chart type
  const [xAxis, setXAxis] = useState('') // State for X-Axis selection
  const [yAxis, setYAxis] = useState('') // State for Y-Axis selection
  const dispatch = useDispatch()

  const headers = csvData.length > 0 ? Object.keys(csvData[0]) : [] // Get headers from CSV data
  const [clicked, setClicked] = useState(false) // State to track download button click
  const [clicked1, setClicked1] = useState(false) // State to track apply configuration button click

  // Handle configuration submission
  const handleConfigSubmit = () => {
    setClicked1(true)
    if (xAxis && yAxis) {
      // Ensure both axes are selected before dispatching
      dispatch(setChartConfig({ chartType, xAxis, yAxis }))
    }
  }

  // Handle CSV download
  const handleDownload = () => {
    setClicked(true)
    if (csvData.length === 0) return
    const csv = Papa.unparse(csvData) // Convert JSON data to CSV format
    const blob = new Blob([csv], { type: 'text/csv' }) // Create a CSV blob
    const link = document.createElement('a') // Create a download link
    link.href = URL.createObjectURL(blob) // Object URL for downloading
    link.download = 'data.csv' // File name for the download
    link.click() // Trigger the download
  }

  const chartTypes = [
    { id: 'BarChart', label: 'Bar Chart', icon: BarChart3 },
    { id: 'LineChart', label: 'Line Chart', icon: LineChart },
    { id: 'PieChart', label: 'Pie Chart', icon: PieChart },
  ]

  return (
    <div className=" bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2 mb-4 sm:mb-0">
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
            Chart Configuration
          </h2>
          <div className="flex flex-col items-center">
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 text-sm sm:text-base"
            >
              <Download className="w-4 h-4" />
              Download CSV
            </button>

            {clicked && csvData.length === 0 && (
              <div className="mt-4 text-sm text-red-500 bg-red-100 px-4 py-2 rounded-lg shadow-md">
                No data available to download.
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chart Type
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {chartTypes.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setChartType(id)}
                    className={`flex flex-col items-center justify-center p-2 sm:p-4 rounded-lg border-2 transition-all duration-200 ${
                      chartType === id
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6 mb-1 sm:mb-2" />
                    <span className="text-xs sm:text-sm font-medium">
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Axis Selection
              </label>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                    X-Axis
                  </label>
                  <select
                    value={xAxis}
                    onChange={(e) => setXAxis(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    <option value="">Select X-Axis</option>
                    {headers.map((header) => (
                      <option key={header} value={header}>
                        {header}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                    Y-Axis
                  </label>
                  <select
                    value={yAxis}
                    onChange={(e) => setYAxis(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    <option value="">Select Y-Axis</option>
                    {headers.map((header) => (
                      <option key={header} value={header}>
                        {header}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="flex flex-col items-center">
            <button
              onClick={handleConfigSubmit}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Settings className="w-4 h-4" />
              Apply Configuration
            </button>
            {clicked1 && csvData.length === 0 && (
              <div className="mt-4 text-sm text-red-500 bg-red-100 px-4 py-2 rounded-lg shadow-md">
                Please Select both X and Y Axes.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChartSelector
