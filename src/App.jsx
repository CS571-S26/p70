import { Navigate, Route, Routes } from 'react-router-dom'

import PageLayout from './components/PageLayout'
import HomePage from './pages/HomePage'
import VisualizerPage from './pages/VisualizerPage'

function PlaceholderPage({ title }) {
  return (
    <PageLayout title={title}>
      <p className="text-muted mb-0">This page is a Phase B placeholder.</p>
    </PageLayout>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/visualizer" element={<VisualizerPage />} />
      <Route path="/explore" element={<PlaceholderPage title="Explore" />} />
      <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
      <Route path="/about" element={<PlaceholderPage title="About" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
