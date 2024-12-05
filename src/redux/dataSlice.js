import { createSlice } from '@reduxjs/toolkit'

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    csvData: [],
    fileName: '', // Store the file name
    chartConfig: {
      chartType: 'BarChart',
      xAxis: '',
      yAxis: '',
    },
  },
  reducers: {
    setCsvData: (state, action) => {
      state.csvData = action.payload.data
      state.fileName = action.payload.fileName // Store the filename
    },
    setChartConfig: (state, action) => {
      state.chartConfig = action.payload
    },
  },
})

export const { setCsvData, setChartConfig } = dataSlice.actions
export default dataSlice.reducer
