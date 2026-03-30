import { useMemo, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'

import ControlPanel from '../components/ControlPanel'
import PageLayout from '../components/PageLayout'
import VisualizationCanvas from '../components/VisualizationCanvas'

function VisualizerPage() {
  const [datasetSize, setDatasetSize] = useState(80)
  const [noise, setNoise] = useState(0.2)
  const [selectedModel, setSelectedModel] = useState('logistic-regression')
  const [showOverlay, setShowOverlay] = useState(true)

  const selectedModelLabel = useMemo(() => {
    const modelNames = {
      'logistic-regression': 'Logistic Regression',
      perceptron: 'Perceptron',
      knn: 'k-Nearest Neighbors',
    }

    return modelNames[selectedModel] ?? selectedModel
  }, [selectedModel])

  return (
    <PageLayout
      title="Interactive Visualizer"
      lead="Adjust controls to explore how dataset and model settings change the visualization context."
    >
      <Row className="g-4">
        <Col lg={8}>
          <VisualizationCanvas />

          <Card className="mt-3">
            <Card.Body>
              <Card.Title as="h2" className="h6 mb-2">
                Current Configuration
              </Card.Title>
              <Card.Text className="mb-1">
                Model: <strong>{selectedModelLabel}</strong>
              </Card.Text>
              <Card.Text className="mb-1">
                Dataset size: <strong>{datasetSize}</strong> points
              </Card.Text>
              <Card.Text className="mb-1">
                Noise: <strong>{noise.toFixed(2)}</strong>
              </Card.Text>
              <Card.Text className="mb-0">
                Overlay: <strong>{showOverlay ? 'On' : 'Off'}</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <ControlPanel
            datasetSize={datasetSize}
            noise={noise}
            model={selectedModel}
            showOverlay={showOverlay}
            onDatasetSizeChange={setDatasetSize}
            onNoiseChange={setNoise}
            onModelChange={setSelectedModel}
            onShowOverlayChange={setShowOverlay}
            onReset={() => {
              setDatasetSize(80)
              setNoise(0.2)
              setSelectedModel('logistic-regression')
              setShowOverlay(true)
            }}
          />
        </Col>
      </Row>
    </PageLayout>
  )
}

export default VisualizerPage
