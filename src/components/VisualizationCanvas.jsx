import { Card } from 'react-bootstrap'

function VisualizationCanvas() {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="p-3 p-md-4">
        <Card.Title as="h2" className="h5 mb-2">
          Visualization
        </Card.Title>
        <Card.Text className="text-muted mb-3">
          This panel will display the dataset, model decision boundary, and training updates as you
          adjust controls. For now, the mock chart below shows where that interactive view will
          appear.
        </Card.Text>

        <div
          className="canvas-placeholder"
          role="img"
          aria-label="Mock scatter plot area for upcoming interactive visualization"
        >
          <svg
            viewBox="0 0 320 180"
            width="100%"
            height="180"
            aria-hidden="true"
            focusable="false"
          >
            <rect x="1" y="1" width="318" height="178" fill="#ffffff" stroke="#ced4da" rx="6" />
            <line x1="36" y1="145" x2="288" y2="145" stroke="#6c757d" strokeWidth="2" />
            <line x1="36" y1="145" x2="36" y2="28" stroke="#6c757d" strokeWidth="2" />

            <circle cx="84" cy="115" r="6" fill="#0d6efd" />
            <circle cx="112" cy="96" r="6" fill="#0d6efd" />
            <circle cx="144" cy="109" r="6" fill="#0d6efd" />

            <rect x="182" y="70" width="12" height="12" fill="#dc3545" />
            <rect x="217" y="58" width="12" height="12" fill="#dc3545" />
            <rect x="248" y="74" width="12" height="12" fill="#dc3545" />

            <line
              x1="56"
              y1="132"
              x2="275"
              y2="44"
              stroke="#198754"
              strokeWidth="3"
              strokeDasharray="7 5"
            />
          </svg>
        </div>

        <p className="small text-muted mt-3 mb-0">
          Blue circles and red squares indicate different classes, and the dashed green line
          represents a sample decision boundary.
        </p>
      </Card.Body>
    </Card>
  )
}

export default VisualizationCanvas
