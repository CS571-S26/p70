import { Button, Card, Form } from 'react-bootstrap'

function RangeControl({
  controlId,
  label,
  valueLabel,
  min,
  max,
  step,
  value,
  onChange,
  description,
}) {
  const helpId = `${controlId}-help`

  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label className="fw-semibold">
        {label} ({valueLabel})
      </Form.Label>
      <Form.Range
        min={min}
        max={max}
        step={step}
        value={value}
        aria-describedby={description ? helpId : undefined}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      {description ? (
        <Form.Text id={helpId} muted>
          {description}
        </Form.Text>
      ) : null}
    </Form.Group>
  )
}

function ParameterControls({
  datasetSize = 80,
  noise = 0.2,
  randomSeed = 42,
  model = 'logistic-regression',
  showOverlay = true,
  modelOptions = [
    { value: 'logistic-regression', label: 'Logistic Regression' },
    { value: 'perceptron', label: 'Perceptron' },
    { value: 'knn', label: 'k-Nearest Neighbors' },
  ],
  onDatasetSizeChange = () => { },
  onNoiseChange = () => { },
  onRandomSeedChange = () => { },
  onModelChange = () => { },
  onShowOverlayChange = () => { },
  onReset = () => { },
}) {
  return (
    <Card className="shadow-sm h-100">
      <Card.Body className="p-3 p-md-4">
        <Card.Title as="h2" className="h5 mb-2">
          Parameter Controls
        </Card.Title>
        <Card.Text className="text-muted mb-4">
          Adjust dataset and model settings to prepare the visualization state.
        </Card.Text>

        <Form>
          <RangeControl
            controlId="dataset-size"
            label="Dataset Size"
            valueLabel={`${datasetSize} points`}
            min={20}
            max={500}
            step={10}
            value={datasetSize}
            description="Controls how many points are generated for the dataset."
            onChange={onDatasetSizeChange}
          />

          <RangeControl
            controlId="noise-level"
            label="Noise"
            valueLabel={noise.toFixed(2)}
            min={0}
            max={1}
            step={0.01}
            value={noise}
            description="Higher noise adds overlap and makes classes harder to separate."
            onChange={onNoiseChange}
          />

          <Form.Group className="mb-3" controlId="random-seed">
            <Form.Label className="fw-semibold">Random Seed</Form.Label>
            <Form.Control
              type="number"
              min={0}
              step={1}
              value={randomSeed}
              onChange={(event) => {
                const nextValue = Number.parseInt(event.target.value, 10)
                onRandomSeedChange(Number.isNaN(nextValue) ? 0 : nextValue)
              }}
              aria-describedby="random-seed-help"
            />
            <Form.Text id="random-seed-help" muted>
              Use a fixed seed to reproduce the same dataset later.
            </Form.Text>
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

export default ParameterControls
