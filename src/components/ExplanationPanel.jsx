import { Card, Col, Row } from 'react-bootstrap'

function ExplanationPanel({
  model,
  selectedModelLabel,
  datasetPointCount,
  showOverlay,
  knnState,
  showConfidence,
  pcaState,
  projectionAngle,
}) {
  return (
    <Card className="mt-3 shadow-sm">
      <Card.Body className="p-3 p-md-4">
        <Card.Title as="h2" className="h6 mb-3">
          Current Model Summary
        </Card.Title>

        {model === 'logistic-regression' ? (
          <Row className="g-2 g-md-3">
            <Col sm={6}>
              <Card.Text className="mb-0 text-secondary">Model</Card.Text>
              <div className="fw-semibold">{selectedModelLabel}</div>
            </Col>
            <Col sm={6}>
              <Card.Text className="mb-0 text-secondary">Classifier Type</Card.Text>
              <div className="fw-semibold">Linear Classifier</div>
            </Col>
            <Col sm={6}>
              <Card.Text className="mb-0 text-secondary">Dataset Size</Card.Text>
              <div className="fw-semibold">{datasetPointCount} points</div>
            </Col>
            <Col sm={6}>
              <Card.Text className="mb-0 text-secondary">Boundary</Card.Text>
              <div className="fw-semibold">{showOverlay ? 'Visible' : 'Hidden'}</div>
            </Col>
            <Col xs={12}>
              <Card.Text className="mb-0 text-secondary">
                A single straight boundary separates two classes in feature space.
              </Card.Text>
            </Col>
          </Row>
        ) : null}

        {model === 'knn' && knnState ? (
          <Row className="g-2 g-md-3">
            <Col sm={6}>
              <Card.Text className="mb-0 text-secondary">Model</Card.Text>
              <div className="fw-semibold">{selectedModelLabel}</div>
            </Col>
            <Col sm={6}>
              <Card.Text className="mb-0 text-secondary">k Value</Card.Text>
              <div className="fw-semibold">{knnState.kValue}</div>
            </Col>
            <Col sm={6}>
              <Card.Text className="mb-0 text-secondary">Predicted Class</Card.Text>
              <div className="fw-semibold">{knnState.predictedLabel === 0 ? 'Class A' : 'Class B'}</div>
            </Col>
            <Col sm={6}>
              <Card.Text className="mb-0 text-secondary">Distance Metric</Card.Text>
              <div className="fw-semibold">
                {knnState.distanceMetric === 'manhattan' ? 'Manhattan' : 'Euclidean'}
              </div>
            </Col>
            <Col sm={6}>
              <Card.Text className="mb-0 text-secondary">Query Point</Card.Text>
              <div className="fw-semibold">
                ({knnState.queryPoint.x.toFixed(2)}, {knnState.queryPoint.y.toFixed(2)})
              </div>
            </Col>
            {showConfidence ? (
              <Col sm={6}>
                <Card.Text className="mb-0 text-secondary">Confidence</Card.Text>
                <div className="fw-semibold">{(knnState.confidence * 100).toFixed(1)}%</div>
              </Col>
            ) : null}
            <Col xs={12}>
              <Card.Text className="mb-0 text-secondary">
                Prediction depends on nearby points around the query point rather than a global boundary.
              </Card.Text>
            </Col>
          </Row>
        ) : null}

        {model === 'pca' && pcaState ? (
          <Row className="g-2 g-md-3">
            <Col sm={6}>
              <Card.Text className="mb-0 text-secondary">Model</Card.Text>
              <div className="fw-semibold">{selectedModelLabel}</div>
            </Col>
            <Col sm={6}>
              <Card.Text className="mb-0 text-secondary">Axis Angle</Card.Text>
              <div className="fw-semibold">{projectionAngle}deg</div>
            </Col>
            <Col sm={6}>
              <Card.Text className="mb-0 text-secondary">Projected Variance</Card.Text>
              <div className="fw-semibold">{pcaState.variance.toFixed(3)}</div>
            </Col>
            <Col sm={6}>
              <Card.Text className="mb-0 text-secondary">Dataset Size</Card.Text>
              <div className="fw-semibold">{datasetPointCount} points</div>
            </Col>
            <Col xs={12}>
              <Card.Text className="mb-0 text-secondary">
                PCA focuses on the direction that maximizes variance in the projected data.
              </Card.Text>
            </Col>
          </Row>
        ) : null}
      </Card.Body>
    </Card>
  )
}

export default ExplanationPanel
