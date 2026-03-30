import { Navigate, Route, Routes } from 'react-router-dom'

import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import VisualizerPage from './pages/VisualizerPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/visualizer" element={<VisualizerPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/explore" element={<Navigate to="/" replace />} />
      <Route path="/settings" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
