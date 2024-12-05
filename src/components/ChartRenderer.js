import React from 'react'
import { Chart } from 'react-google-charts'
import { useSelector } from 'react-redux'

const ChartRenderer = () => {
  // Fetching csvData and chartConfig from Redux store
  const { csvData, chartConfig } = useSelector((state) => state.data)
  const { chartType, xAxis, yAxis } = chartConfig

  // If there is no data or configuration (X and Y axis), display a message to the user
  if (!csvData.length || !xAxis || !yAxis)
    return (
      <div className="flex justify-center items-center h-20 bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          <p className="text-lg text-gray-700 font-semibold">
            Please upload data and configure the chart.
          </p>
        </div>
      </div>
    )

  // Prepare the data for the chart. The first row contains column names (xAxis, yAxis)
  const data = [
    [xAxis, yAxis], // The headers for X and Y axes
    ...csvData.map((row) => [row[xAxis], parseFloat(row[yAxis])]), // Map through the CSV data and get the values for X and Y axes
  ]

  return (
    <div className="p-4 sm:p-6 bg-gray-50 h-[520px] flex justify-center items-center">
      <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-4xl bg-white p-6 sm:p-8 rounded-lg shadow-lg mt-[-0px]">
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-4 sm:mb-6"></h2>
        {/* Render the chart using react-google-charts with dynamic options */}
        <Chart
          chartType={chartType} // The chart type (BarChart, LineChart, etc.) is selected from the config
          data={data} // The data for the chart (X and Y values)
          width="100%" // Width of the chart
          height="400px" // Height of the chart (fixed for better layout)
          options={{
            title: 'Dynamic Chart', // Title for the chart
            titleTextStyle: {
              fontSize: 18, // Title font size
              color: '#4a5568', // Title font color
              fontName: 'Arial', // Title font family
            },
            chartArea: {
              width: '80%', // Chart area width, with some padding
              height: '70%', // Chart area height
            },
          }}
        />
      </div>
    </div>
  )
}

export default ChartRenderer
