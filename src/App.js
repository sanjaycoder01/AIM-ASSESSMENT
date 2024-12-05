import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DataUploadPage from './pages/DataUploadPage'
import ChartPage from './pages/ChartPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataUploadPage />} />
        <Route path="/chart" element={<ChartPage />} />

        {/* Correct usage of 'element' */}
      </Routes>
    </Router>
  )
}

export default App
