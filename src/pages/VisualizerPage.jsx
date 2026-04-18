import { useEffect, useMemo, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'

import PageLayout from '../components/PageLayout'
import ParameterControls from '../components/ParameterControls'
import VisualizationCanvas from '../components/VisualizationCanvas'

const VALID_MODELS = ['logistic-regression', 'perceptron', 'knn']

function VisualizerPage() {
  const [searchParams] = useSearchParams()
  const requestedModel = searchParams.get('model')

  const [datasetSize, setDatasetSize] = useState(80)
  const [noise, setNoise] = useState(0.2)
  const [randomSeed, setRandomSeed] = useState(42)
  const [selectedModel, setSelectedModel] = useState(
    VALID_MODELS.includes(requestedModel) ? requestedModel : 'logistic-regression',
  )
  const [showOverlay, setShowOverlay] = useState(true)

  useEffect(() => {
    if (VALID_MODELS.includes(requestedModel)) {
      setSelectedModel(requestedModel)
    }
  }, [requestedModel])

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
      lead="Use the controls to tune the setup, then read the live summary to see exactly what the visualization is configured to show."
    >
      <Row className="g-4 align-items-start">
        <Col lg={8}>
          <div className="pe-lg-2">
            <VisualizationCanvas />

            <Card className="mt-3 shadow-sm">
              <Card.Body className="p-3 p-md-4">
                <Card.Title as="h2" className="h6 mb-3">
                  Current Configuration
                </Card.Title>
                <Row className="g-2 g-md-3">
                  <Col sm={6}>
                    <Card.Text className="mb-0 text-secondary">Model</Card.Text>
                    <div className="fw-semibold">{selectedModelLabel}</div>
                  </Col>
                  <Col sm={6}>
                    <Card.Text className="mb-0 text-secondary">Dataset Size</Card.Text>
                    <div className="fw-semibold">{datasetSize} points</div>
                  </Col>
                  <Col sm={6}>
                    <Card.Text className="mb-0 text-secondary">Noise</Card.Text>
                    <div className="fw-semibold">{noise.toFixed(2)}</div>
                  </Col>
                  <Col sm={6}>
                    <Card.Text className="mb-0 text-secondary">Random Seed</Card.Text>
                    <div className="fw-semibold">{randomSeed}</div>
                  </Col>
                  <Col sm={6}>
                    <Card.Text className="mb-0 text-secondary">Overlay</Card.Text>
                    <div className="fw-semibold">{showOverlay ? 'On' : 'Off'}</div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col lg={4}>
          <div className="ps-lg-2">
            <ParameterControls
              datasetSize={datasetSize}
              noise={noise}
              randomSeed={randomSeed}
              model={selectedModel}
              showOverlay={showOverlay}
              onDatasetSizeChange={setDatasetSize}
              onNoiseChange={setNoise}
              onRandomSeedChange={setRandomSeed}
              onModelChange={setSelectedModel}
              onShowOverlayChange={setShowOverlay}
              onReset={() => {
                setDatasetSize(80)
                setNoise(0.2)
                setRandomSeed(42)
                setSelectedModel('logistic-regression')
                setShowOverlay(true)
              }}
            />
          </div>
        </Col>
      </Row>
    </PageLayout>
  )
}

export default VisualizerPage
