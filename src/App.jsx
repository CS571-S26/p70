import { Navigate, Route, Routes } from 'react-router-dom'

import AboutPage from './pages/AboutPage'
import ConceptDetailPage from './pages/ConceptDetailPage'
import ExplorePage from './pages/ExplorePage'
import HomePage from './pages/HomePage'
import VisualizerPage from './pages/VisualizerPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/explore/:id" element={<ConceptDetailPage />} />
      <Route path="/visualizer" element={<VisualizerPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/settings" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
