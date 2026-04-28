import { Card } from 'react-bootstrap'

const CHART_WIDTH = 700
const CHART_HEIGHT = 420
const PADDING = 56
const DOMAIN_MIN = -3
const DOMAIN_MAX = 3
const DOMAIN_RANGE = DOMAIN_MAX - DOMAIN_MIN
const TICK_VALUES = [-3, -2, -1, 0, 1, 2, 3]

function toPixelX(value) {
  return PADDING + ((value - DOMAIN_MIN) / DOMAIN_RANGE) * (CHART_WIDTH - 2 * PADDING)
}

function toPixelY(value) {
  return CHART_HEIGHT - PADDING - ((value - DOMAIN_MIN) / DOMAIN_RANGE) * (CHART_HEIGHT - 2 * PADDING)
}

function distanceToPixels(distance) {
  return (distance / DOMAIN_RANGE) * (CHART_WIDTH - 2 * PADDING)
}

function renderAxes() {
  return (
    <>
      <line
        x1={PADDING}
        y1={CHART_HEIGHT - PADDING}
        x2={CHART_WIDTH - PADDING}
        y2={CHART_HEIGHT - PADDING}
        stroke="#8b929a"
        strokeWidth="1.6"
      />
      <line
        x1={PADDING}
        y1={CHART_HEIGHT - PADDING}
        x2={PADDING}
        y2={PADDING}
        stroke="#8b929a"
        strokeWidth="1.6"
      />

      {TICK_VALUES.map((tick) => (
        <g key={`x-tick-${tick}`}>
          <line
            x1={toPixelX(tick)}
            y1={CHART_HEIGHT - PADDING}
            x2={toPixelX(tick)}
            y2={CHART_HEIGHT - PADDING + 7}
            stroke="#8b929a"
            strokeWidth="1.2"
          />
          <text
            x={toPixelX(tick)}
            y={CHART_HEIGHT - PADDING + 23}
            fontSize="12"
            fill="#495057"
            textAnchor="middle"
          >
            {tick}
          </text>
        </g>
      ))}

      {TICK_VALUES.map((tick) => (
        <g key={`y-tick-${tick}`}>
          <line
            x1={PADDING}
            y1={toPixelY(tick)}
            x2={PADDING - 7}
            y2={toPixelY(tick)}
            stroke="#8b929a"
            strokeWidth="1.2"
          />
          <text
            x={PADDING - 12}
            y={toPixelY(tick) + 4}
            fontSize="12"
            fill="#495057"
            textAnchor="end"
          >
            {tick}
          </text>
        </g>
      ))}

      <text
        x={CHART_WIDTH / 2}
        y={CHART_HEIGHT - 12}
        fontSize="13"
        fill="#343a40"
        textAnchor="middle"
      >
        X
      </text>
      <text
        x="18"
        y={CHART_HEIGHT / 2}
        fontSize="13"
        fill="#343a40"
        textAnchor="middle"
        transform={`rotate(-90 18 ${CHART_HEIGHT / 2})`}
      >
        Y
      </text>
    </>
  )
}

function renderLogisticView(points, showOverlay, logisticBoundary) {
  return (
    <>
      {showOverlay && logisticBoundary ? (
        <line
          x1={toPixelX(logisticBoundary.x1)}
          y1={toPixelY(logisticBoundary.y1)}
          x2={toPixelX(logisticBoundary.x2)}
          y2={toPixelY(logisticBoundary.y2)}
          stroke="#198754"
          strokeWidth="3"
        />
      ) : null}

      {points.map((point) =>
        point.label === 0 ? (
          <circle
            key={point.id}
            cx={toPixelX(point.x)}
            cy={toPixelY(point.y)}
            r="4.4"
            fill="#0d6efd"
            stroke="#1f2d3d"
            strokeWidth="0.9"
          />
        ) : (
          <circle
            key={point.id}
            cx={toPixelX(point.x)}
            cy={toPixelY(point.y)}
            r="4.4"
            fill="#dc3545"
            fillOpacity="0.92"
            stroke="#1f2d3d"
            strokeWidth="1.3"
          />
        ),
      )}
    </>
  )
}

function renderKnnView(points, knnState) {
  const neighborSet = new Set(knnState.neighborIds)
  const queryPx = toPixelX(knnState.queryPoint.x)
  const queryPy = toPixelY(knnState.queryPoint.y)

  return (
    <>
      {knnState.showNeighbors && knnState.neighborRadius > 0 ? (
        <circle
          cx={queryPx}
          cy={queryPy}
          r={distanceToPixels(knnState.neighborRadius)}
          fill="none"
          stroke="#adb5bd"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      ) : null}

      {knnState.showNeighbors
        ? points
          .filter((point) => neighborSet.has(point.id))
          .map((point) => (
            <line
              key={`link-${point.id}`}
              x1={queryPx}
              y1={queryPy}
              x2={toPixelX(point.x)}
              y2={toPixelY(point.y)}
              stroke="#495057"
              strokeWidth="1.4"
              opacity="0.75"
            />
          ))
        : null}

      {points.map((point) => {
        const isNeighbor = neighborSet.has(point.id)
        return (
          <circle
            key={point.id}
            cx={toPixelX(point.x)}
            cy={toPixelY(point.y)}
            r={isNeighbor ? 6 : 4.4}
            fill={point.label === 0 ? '#0d6efd' : '#dc3545'}
            fillOpacity={point.label === 0 ? 1 : 0.92}
            stroke={isNeighbor ? '#111111' : '#1f2d3d'}
            strokeWidth={isNeighbor ? 1.8 : point.label === 0 ? 0.9 : 1.3}
          />
        )
      })}

      <circle cx={queryPx} cy={queryPy} r="6.5" fill="#f8f9fa" stroke="#111111" strokeWidth="2.2" />
      <circle cx={queryPx} cy={queryPy} r="2.4" fill="#111111" />
    </>
  )
}

function renderPcaView(points, pcaState) {
  const axisDirectionX = Math.cos((pcaState.axisAngle * Math.PI) / 180)
  const axisDirectionY = Math.sin((pcaState.axisAngle * Math.PI) / 180)

  const axisStart = {
    x: -3 * axisDirectionX,
    y: -3 * axisDirectionY,
  }
  const axisEnd = {
    x: 3 * axisDirectionX,
    y: 3 * axisDirectionY,
  }

  return (
    <>
      {pcaState.showProjections
        ? pcaState.projections.map((projection) => (
          <line
            key={`proj-line-${projection.id}`}
            x1={toPixelX(projection.x)}
            y1={toPixelY(projection.y)}
            x2={toPixelX(projection.projX)}
            y2={toPixelY(projection.projY)}
            stroke="#6c757d"
            strokeWidth="1.1"
            opacity="0.75"
          />
        ))
        : null}

      {pcaState.showPrincipalAxis ? (
        <line
          x1={toPixelX(axisStart.x)}
          y1={toPixelY(axisStart.y)}
          x2={toPixelX(axisEnd.x)}
          y2={toPixelY(axisEnd.y)}
          stroke="#0d6efd"
          strokeWidth="3"
        />
      ) : null}

      {points.map((point) => (
        <circle key={point.id} cx={toPixelX(point.x)} cy={toPixelY(point.y)} r="4.2" fill="#20c997" />
      ))}

      {pcaState.showProjections
        ? pcaState.projections.map((projection) => (
          <rect
            key={`proj-point-${projection.id}`}
            x={toPixelX(projection.projX) - 2.7}
            y={toPixelY(projection.projY) - 2.7}
            width="5.4"
            height="5.4"
            fill="#fd7e14"
          />
        ))
        : null}
    </>
  )
}

function VisualizationCanvas({
  model = 'logistic-regression',
  dataset,
  showOverlay = true,
  logisticBoundary = null,
  knnState = null,
  pcaState = null,
}) {
  const points = dataset?.points ?? []
  const classACount = points.filter((point) => point.label === 0).length
  const classBCount = points.filter((point) => point.label === 1).length

  let description = 'Generated model visualization.'
  let footer = `Points shown: ${points.length}`

  if (model === 'logistic-regression') {
    description = 'Binary dataset with a single linear decision boundary for a linear classifier.'
    footer = `Class A: blue circles with thin outline (${classACount}). Class B: red circles with thicker outline (${classBCount}).`
  } else if (model === 'knn') {
    description = 'kNN local view with a query point and nearest-neighbor relationships.'
    footer = `Query uses k=${knnState?.kValue ?? 0} with ${knnState?.distanceMetric ?? 'euclidean'} distance. Class A: blue outlined circles (${classACount}). Class B: red outlined circles with thicker stroke (${classBCount}).`
  } else if (model === 'pca') {
    description = 'PCA projection view showing principal-axis geometry and projected points.'
    footer = `Point cloud: circles. Projected points: small squares. Principal axis: bold line. Projected variance: ${(pcaState?.variance ?? 0).toFixed(3)}.`
  }

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="p-3 p-md-4">
        <Card.Title as="h2" className="h5 mb-2">
          Visualization
        </Card.Title>
        <Card.Text className="text-muted mb-3">{description}</Card.Text>

        <div
          className="canvas-placeholder"
          role="img"
          aria-label={`Model visualization for ${model} with ${points.length} rendered points.`}
        >
          <svg
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
            width="100%"
            height="420"
            aria-hidden="true"
            focusable="false"
          >
            <rect
              x="1"
              y="1"
              width={CHART_WIDTH - 2}
              height={CHART_HEIGHT - 2}
              fill="#ffffff"
              stroke="#ced4da"
              rx="6"
            />
            {renderAxes()}

            {model === 'logistic-regression' ? renderLogisticView(points, showOverlay, logisticBoundary) : null}
            {model === 'knn' && knnState ? renderKnnView(points, knnState) : null}
            {model === 'pca' && pcaState ? renderPcaView(points, pcaState) : null}
          </svg>
        </div>

        <p className="small text-muted mt-3 mb-0">{footer}</p>
      </Card.Body>
    </Card>
  )
}

export default VisualizationCanvas
