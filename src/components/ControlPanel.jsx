import { Button, Card, Form } from 'react-bootstrap'

function ControlPanel({
  datasetSize = 80,
  noise = 0.2,
  model = 'logistic-regression',
  showOverlay = true,
  modelOptions = [
    { value: 'logistic-regression', label: 'Logistic Regression' },
    { value: 'perceptron', label: 'Perceptron' },
    { value: 'knn', label: 'k-Nearest Neighbors' },
  ],
  onDatasetSizeChange = () => {},
  onNoiseChange = () => {},
  onModelChange = () => {},
  onShowOverlayChange = () => {},
  onReset = () => {},
}) {
  return (
    <Card className="shadow-sm h-100">
      <Card.Body className="p-3 p-md-4">
        <Card.Title as="h2" className="h5 mb-2">Control Panel</Card.Title>
        <Card.Text className="text-muted mb-4">
          Adjust dataset and model settings to explore how the visualization changes.
        </Card.Text>

        <Form>
          <Form.Group className="mb-3" controlId="dataset-size">
            <Form.Label className="fw-semibold">Dataset Size ({datasetSize})</Form.Label>
            <Form.Range
              min={20}
              max={500}
              step={10}
              value={datasetSize}
              onChange={(event) => onDatasetSizeChange(Number(event.target.value))}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="noise-level">
            <Form.Label className="fw-semibold">Noise ({noise.toFixed(2)})</Form.Label>
            <Form.Range
              min={0}
              max={1}
              step={0.01}
              value={noise}
              onChange={(event) => onNoiseChange(Number(event.target.value))}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="model-selector">
            <Form.Label className="fw-semibold">Model Selector</Form.Label>
            <Form.Select value={model} onChange={(event) => onModelChange(event.target.value)}>
              {modelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4" controlId="show-overlay-toggle">
            <Form.Check
              type="switch"
              label="Show Overlay"
              checked={showOverlay}
              onChange={(event) => onShowOverlayChange(event.target.checked)}
            />
          </Form.Group>

          <Button type="button" variant="outline-secondary" className="w-100" onClick={onReset}>
            Reset Controls
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default ControlPanel
