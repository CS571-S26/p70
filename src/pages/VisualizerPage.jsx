import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'

import PageLayout from '../components/PageLayout'
import ParameterControls from '../components/ParameterControls'
import VisualizationCanvas from '../components/VisualizationCanvas'
import { useSettings } from '../context/SettingsContext'
import { generatePointCloudDataset, generateTwoClassDataset } from '../utils/datasetGenerator'

const VALID_MODELS = ['logistic-regression', 'knn', 'pca']
const DEFAULT_DATASET_SIZE = 80
const DEFAULT_NOISE = 0.4
const DEFAULT_RANDOM_SEED = 42
const DEFAULT_K = 5
const DEFAULT_DISTANCE_METRIC = 'euclidean'
const DEFAULT_PROJECTION_ANGLE = 35

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function averagePoint(points) {
  if (points.length === 0) {
    return { x: 0, y: 0 }
  }

  const sums = points.reduce(
    (acc, point) => ({
      x: acc.x + point.x,
      y: acc.y + point.y,
    }),
    { x: 0, y: 0 },
  )

  return {
    x: sums.x / points.length,
    y: sums.y / points.length,
  }
}

function getBoundaryIntersections(midpoint, direction, min = -3, max = 3) {
  const intersections = []
  const epsilon = 1e-8

  if (Math.abs(direction.x) > epsilon) {
    const tLeft = (min - midpoint.x) / direction.x
    const yLeft = midpoint.y + tLeft * direction.y
    if (yLeft >= min && yLeft <= max) {
      intersections.push({ x: min, y: yLeft })
    }

    const tRight = (max - midpoint.x) / direction.x
    const yRight = midpoint.y + tRight * direction.y
    if (yRight >= min && yRight <= max) {
      intersections.push({ x: max, y: yRight })
    }
  }

  if (Math.abs(direction.y) > epsilon) {
    const tBottom = (min - midpoint.y) / direction.y
    const xBottom = midpoint.x + tBottom * direction.x
    if (xBottom >= min && xBottom <= max) {
      intersections.push({ x: xBottom, y: min })
    }

    const tTop = (max - midpoint.y) / direction.y
    const xTop = midpoint.x + tTop * direction.x
    if (xTop >= min && xTop <= max) {
      intersections.push({ x: xTop, y: max })
    }
  }

  if (intersections.length < 2) {
    return null
  }

  return {
    x1: intersections[0].x,
    y1: intersections[0].y,
    x2: intersections[1].x,
    y2: intersections[1].y,
  }
}

function distance(point, queryPoint, metric) {
  const dx = point.x - queryPoint.x
  const dy = point.y - queryPoint.y

  if (metric === 'manhattan') {
    return Math.abs(dx) + Math.abs(dy)
  }

  return Math.hypot(dx, dy)
}

function VisualizerPage() {
  const { settings } = useSettings()
  const [searchParams] = useSearchParams()
  const requestedModel = searchParams.get('model')

  const initialSettingsRef = useRef(null)
  if (initialSettingsRef.current === null) {
    const initialModel = VALID_MODELS.includes(requestedModel)
      ? requestedModel
      : (VALID_MODELS.includes(settings.defaultModel) ? settings.defaultModel : 'logistic-regression')

    initialSettingsRef.current = {
      model: initialModel,
      datasetSize: settings.defaultDatasetSize ?? DEFAULT_DATASET_SIZE,
      noise: settings.defaultNoise ?? DEFAULT_NOISE,
    }
  }

  const [datasetSize, setDatasetSize] = useState(() => initialSettingsRef.current.datasetSize)
  const [noise, setNoise] = useState(() => initialSettingsRef.current.noise)
  const [randomSeed, setRandomSeed] = useState(DEFAULT_RANDOM_SEED)
  const [selectedModel, setSelectedModel] = useState(() => initialSettingsRef.current.model)
  const [showOverlay, setShowOverlay] = useState(true)
  const [kValue, setKValue] = useState(DEFAULT_K)
  const [distanceMetric, setDistanceMetric] = useState(DEFAULT_DISTANCE_METRIC)
  const [showNeighbors, setShowNeighbors] = useState(true)
  const [showConfidence, setShowConfidence] = useState(true)
  const [projectionAngle, setProjectionAngle] = useState(DEFAULT_PROJECTION_ANGLE)
  const [showProjections, setShowProjections] = useState(true)
  const [showPrincipalAxis, setShowPrincipalAxis] = useState(true)
  const [queryPointOverride, setQueryPointOverride] = useState(null)

  const [dataset, setDataset] = useState(() => {
    if (initialSettingsRef.current.model === 'pca') {
      return generatePointCloudDataset({
        size: initialSettingsRef.current.datasetSize,
        noise: initialSettingsRef.current.noise,
        seed: DEFAULT_RANDOM_SEED,
      })
    }

    return generateTwoClassDataset({
      size: initialSettingsRef.current.datasetSize,
      noise: initialSettingsRef.current.noise,
      seed: DEFAULT_RANDOM_SEED,
    })
  })

  const regenerateDataset = useCallback(() => {
    if (selectedModel === 'pca') {
      setDataset(
        generatePointCloudDataset({
          size: datasetSize,
          noise,
          seed: randomSeed,
        }),
      )
      return
    }

    setDataset(
      generateTwoClassDataset({
        size: datasetSize,
        noise,
        seed: randomSeed,
      }),
    )
  }, [datasetSize, noise, randomSeed, selectedModel])

  useEffect(() => {
    regenerateDataset()
  }, [regenerateDataset])

  const selectedModelLabel = useMemo(() => {
    const modelNames = {
      'logistic-regression': 'Logistic Regression',
      knn: 'k-Nearest Neighbors',
      pca: 'Principal Component Analysis (PCA)',
    }

    return modelNames[selectedModel] ?? selectedModel
  }, [selectedModel])

  const logisticBoundary = useMemo(() => {
    if (selectedModel !== 'logistic-regression') {
      return null
    }

    const classA = dataset.points.filter((point) => point.label === 0)
    const classB = dataset.points.filter((point) => point.label === 1)
    if (classA.length === 0 || classB.length === 0) {
      return { x1: -3, y1: 3, x2: 3, y2: -3 }
    }

    const meanA = averagePoint(classA)
    const meanB = averagePoint(classB)
    const normal = {
      x: meanB.x - meanA.x,
      y: meanB.y - meanA.y,
    }
    const midpoint = {
      x: (meanA.x + meanB.x) / 2,
      y: (meanA.y + meanB.y) / 2,
    }
    const boundaryDirection = {
      x: -normal.y,
      y: normal.x,
    }

    return getBoundaryIntersections(midpoint, boundaryDirection) ?? { x1: -3, y1: 3, x2: 3, y2: -3 }
  }, [dataset.points, selectedModel])

  const knnState = useMemo(() => {
    if (selectedModel !== 'knn') {
      return null
    }

    const points = dataset.points.filter((point) => typeof point.label === 'number')
    if (points.length === 0) {
      return null
    }

    const angle = ((randomSeed * 47) % 360) * (Math.PI / 180)
    const fallbackQueryPoint = {
      x: clamp(Math.cos(angle) * (0.75 + noise * 0.55), -2.5, 2.5),
      y: clamp(Math.sin(angle * 1.33) * (0.65 + noise * 0.65), -2.5, 2.5),
    }
    const queryPoint = queryPointOverride ?? fallbackQueryPoint

    const ranked = points
      .map((point) => ({
        id: point.id,
        label: point.label,
        distance: distance(point, queryPoint, distanceMetric),
      }))
      .sort((a, b) => a.distance - b.distance)

    const safeK = Math.max(1, Math.min(kValue, ranked.length))
    const neighbors = ranked.slice(0, safeK)
    const votes = neighbors.reduce(
      (acc, neighbor) => {
        if (neighbor.label === 0) {
          return { ...acc, classA: acc.classA + 1 }
        }
        return { ...acc, classB: acc.classB + 1 }
      },
      { classA: 0, classB: 0 },
    )

    let predictedLabel = 0
    if (votes.classB > votes.classA) {
      predictedLabel = 1
    } else if (votes.classA === votes.classB && neighbors.length > 0) {
      predictedLabel = neighbors[0].label
    }

    const confidence = Math.max(votes.classA, votes.classB) / safeK
    const neighborRadius = neighbors.length > 0 ? neighbors[neighbors.length - 1].distance : 0

    return {
      queryPoint,
      neighborIds: neighbors.map((neighbor) => neighbor.id),
      neighborRadius,
      predictedLabel,
      confidence,
      kValue: safeK,
      distanceMetric,
      showNeighbors,
      showConfidence,
    }
  }, [dataset.points, distanceMetric, kValue, noise, queryPointOverride, randomSeed, selectedModel, showConfidence, showNeighbors])

  const pcaState = useMemo(() => {
    if (selectedModel !== 'pca') {
      return null
    }

    const points = dataset.points
    if (points.length === 0) {
      return null
    }

    const angleRadians = (projectionAngle * Math.PI) / 180
    const axis = {
      x: Math.cos(angleRadians),
      y: Math.sin(angleRadians),
    }

    const projectionScalars = points.map((point) => point.x * axis.x + point.y * axis.y)
    const meanProjection =
      projectionScalars.reduce((sum, scalar) => sum + scalar, 0) / Math.max(1, projectionScalars.length)

    const variance =
      projectionScalars.reduce((sum, scalar) => sum + (scalar - meanProjection) ** 2, 0) /
      Math.max(1, projectionScalars.length)

    const projections = points.map((point, index) => {
      const scalar = projectionScalars[index]
      return {
        id: point.id,
        x: point.x,
        y: point.y,
        projX: axis.x * scalar,
        projY: axis.y * scalar,
      }
    })

    return {
      axisAngle: projectionAngle,
      variance,
      projections,
      showProjections,
      showPrincipalAxis,
    }
  }, [dataset.points, projectionAngle, selectedModel, showPrincipalAxis, showProjections])

  return (
    <PageLayout
      title="Interactive Visualizer"
      lead="Explore machine learning concepts through model-specific controls, geometric views, and data interactions."
    >
      <Row className="g-4 align-items-start">
        <Col lg={9}>
          <div className="pe-lg-2">
            <VisualizationCanvas
              model={selectedModel}
              dataset={dataset}
              showOverlay={showOverlay}
              logisticBoundary={logisticBoundary}
              knnState={knnState}
              pcaState={pcaState}
            />

            <Card className="mt-3 shadow-sm">
              <Card.Body className="p-3 p-md-4">
                <Card.Title as="h2" className="h6 mb-3">
                  Current Model Summary
                </Card.Title>

                {selectedModel === 'logistic-regression' ? (
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
                      <div className="fw-semibold">{dataset.points.length} points</div>
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

                {selectedModel === 'knn' && knnState ? (
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

                {selectedModel === 'pca' && pcaState ? (
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
                      <div className="fw-semibold">{dataset.points.length} points</div>
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
          </div>
        </Col>

        <Col lg={3}>
          <div className="ps-lg-2">
            <ParameterControls
              model={selectedModel}
              datasetSize={datasetSize}
              noise={noise}
              randomSeed={randomSeed}
              showOverlay={showOverlay}
              kValue={kValue}
              distanceMetric={distanceMetric}
              showNeighbors={showNeighbors}
              showConfidence={showConfidence}
              projectionAngle={projectionAngle}
              showProjections={showProjections}
              showPrincipalAxis={showPrincipalAxis}
              onDatasetSizeChange={setDatasetSize}
              onNoiseChange={setNoise}
              onRandomSeedChange={setRandomSeed}
              onModelChange={setSelectedModel}
              onShowOverlayChange={setShowOverlay}
              onKValueChange={setKValue}
              onDistanceMetricChange={setDistanceMetric}
              onShowNeighborsChange={setShowNeighbors}
              onShowConfidenceChange={setShowConfidence}
              onProjectionAngleChange={setProjectionAngle}
              onShowProjectionsChange={setShowProjections}
              onShowPrincipalAxisChange={setShowPrincipalAxis}
              onRandomizeQueryPoint={() => {
                setQueryPointOverride({
                  x: clamp(-2.5 + Math.random() * 5, -2.5, 2.5),
                  y: clamp(-2.5 + Math.random() * 5, -2.5, 2.5),
                })
              }}
              onReset={() => {
                const resetModel = initialSettingsRef.current.model
                const resetDatasetSize = initialSettingsRef.current.datasetSize
                const resetNoise = initialSettingsRef.current.noise

                setSelectedModel(resetModel)
                setDatasetSize(resetDatasetSize)
                setNoise(resetNoise)
                setRandomSeed(DEFAULT_RANDOM_SEED)
                setKValue(DEFAULT_K)
                setDistanceMetric(DEFAULT_DISTANCE_METRIC)
                setShowNeighbors(true)
                setShowConfidence(true)
                setProjectionAngle(DEFAULT_PROJECTION_ANGLE)
                setShowProjections(true)
                setShowPrincipalAxis(true)
                setShowOverlay(true)
                setQueryPointOverride(null)

                if (resetModel === 'pca') {
                  setDataset(
                    generatePointCloudDataset({
                      size: resetDatasetSize,
                      noise: resetNoise,
                      seed: DEFAULT_RANDOM_SEED,
                    }),
                  )
                } else {
                  setDataset(
                    generateTwoClassDataset({
                      size: resetDatasetSize,
                      noise: resetNoise,
                      seed: DEFAULT_RANDOM_SEED,
                    }),
                  )
                }
              }}
            />
          </div>
        </Col>
      </Row>
    </PageLayout>
  )
}

export default VisualizerPage
