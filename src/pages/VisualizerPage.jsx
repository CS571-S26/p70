import { Col, Row } from 'react-bootstrap'

import ControlPanel from '../components/ControlPanel'
import PageLayout from '../components/PageLayout'
import VisualizationCanvas from '../components/VisualizationCanvas'

function VisualizerPage() {
  return (
    <PageLayout title="Visualizer">
      <Row className="g-4">
        <Col lg={4}>
          <ControlPanel />
        </Col>
        <Col lg={8}>
          <VisualizationCanvas />
        </Col>
      </Row>
    </PageLayout>
  )
}

export default VisualizerPage
