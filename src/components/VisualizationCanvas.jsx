import Card from 'react-bootstrap/Card'

function VisualizationCanvas() {
  return (
    <Card>
      <Card.Body>
        <Card.Title as="h2" className="h5">Visualization Canvas</Card.Title>
        <div className="canvas-placeholder" role="img" aria-label="Visualization placeholder">
          Interactive plot placeholder
        </div>
      </Card.Body>
    </Card>
  )
}

export default VisualizationCanvas
