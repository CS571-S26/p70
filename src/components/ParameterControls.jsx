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
  model = 'logistic-regression',
  datasetSize = 80,
  noise = 0.2,
  randomSeed = 42,
  modelOptions = [
    { value: 'logistic-regression', label: 'Logistic Regression' },
    { value: 'knn', label: 'k-Nearest Neighbors' },
    { value: 'pca', label: 'Principal Component Analysis (PCA)' },
  ],
  showOverlay = true,
  kValue = 5,
  distanceMetric = 'euclidean',
  showNeighbors = true,
  showConfidence = true,
  projectionAngle = 35,
  showProjections = true,
  showPrincipalAxis = true,
  onDatasetSizeChange = () => {},
  onNoiseChange = () => {},
  onRandomSeedChange = () => {},
  onModelChange = () => {},
  onShowOverlayChange = () => {},
  onKValueChange = () => {},
  onDistanceMetricChange = () => {},
  onShowNeighborsChange = () => {},
  onShowConfidenceChange = () => {},
  onProjectionAngleChange = () => {},
  onShowProjectionsChange = () => {},
  onShowPrincipalAxisChange = () => {},
  onGenerate = () => {},
  onReset = () => {},
}) {
  return (
    <Card className="shadow-sm h-100">
      <Card.Body className="p-3 p-md-4">
        <Card.Title as="h2" className="h5 mb-2">
          Parameter Controls
        </Card.Title>
        <Card.Text className="text-muted mb-4">
          Controls update based on the selected model so you only see relevant settings.
        </Card.Text>

        <Form>
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
            description="Higher noise increases overlap and spread."
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
              Use a fixed seed to reproduce the same generated points.
            </Form.Text>
          </Form.Group>

          {model === 'logistic-regression' ? (
            <Form.Group className="mb-4" controlId="show-overlay-toggle">
              <Form.Check
                type="switch"
                label="Show Decision Boundary"
                checked={showOverlay}
                onChange={(event) => onShowOverlayChange(event.target.checked)}
              />
            </Form.Group>
          ) : null}

          {model === 'knn' ? (
            <>
              <RangeControl
                controlId="knn-k-value"
                label="k Value"
                valueLabel={`${kValue}`}
                min={1}
                max={25}
                step={1}
                value={kValue}
                description="Number of neighbors used for local voting."
                onChange={onKValueChange}
              />

              <Form.Group className="mb-3" controlId="distance-metric">
                <Form.Label className="fw-semibold">Distance Metric</Form.Label>
                <Form.Select value={distanceMetric} onChange={(event) => onDistanceMetricChange(event.target.value)}>
                  <option value="euclidean">Euclidean</option>
                  <option value="manhattan">Manhattan</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2" controlId="show-neighbors-toggle">
                <Form.Check
                  type="switch"
                  label="Show Neighbors"
                  checked={showNeighbors}
                  onChange={(event) => onShowNeighborsChange(event.target.checked)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="show-confidence-toggle">
                <Form.Check
                  type="switch"
                  label="Show Confidence"
                  checked={showConfidence}
                  onChange={(event) => onShowConfidenceChange(event.target.checked)}
                />
              </Form.Group>
            </>
          ) : null}

          {model === 'pca' ? (
            <>
              <RangeControl
                controlId="projection-angle"
                label="Projection Axis Angle"
                valueLabel={`${projectionAngle}deg`}
                min={0}
                max={180}
                step={1}
                value={projectionAngle}
                description="Rotates the projection axis used for PCA-style projection."
                onChange={onProjectionAngleChange}
              />

              <Form.Group className="mb-2" controlId="show-principal-axis-toggle">
                <Form.Check
                  type="switch"
                  label="Show Principal Axis"
                  checked={showPrincipalAxis}
                  onChange={(event) => onShowPrincipalAxisChange(event.target.checked)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="show-projections-toggle">
                <Form.Check
                  type="switch"
                  label="Show Projections"
                  checked={showProjections}
                  onChange={(event) => onShowProjectionsChange(event.target.checked)}
                />
              </Form.Group>
            </>
          ) : null}

          <div className="d-grid gap-2">
            <Button type="button" variant="primary" onClick={onGenerate}>
              Generate Dataset
            </Button>
            <Button type="button" variant="outline-secondary" onClick={onReset}>
              Reset Controls
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default ParameterControls
