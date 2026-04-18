import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

import PageLayout from '../components/PageLayout'
import { getConceptById } from '../data/concepts'

function ConceptDetailPage() {
  const { id } = useParams()
  const concept = getConceptById(id)

  if (!concept) {
    return (
      <PageLayout
        title="Concept Not Found"
        lead="We could not find that concept. Try returning to Explore to pick a valid topic."
        headerTop={(
          <Button as={Link} to="/explore" variant="outline-secondary">
            Back to Explore
          </Button>
        )}
      >
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Text className="mb-3">
              The concept id <code>{id}</code> is not available yet.
            </Card.Text>
            <div className="d-flex flex-wrap gap-2">
              <Button as={Link} to="/visualizer" variant="outline-primary">
                Open Visualizer
              </Button>
            </div>
          </Card.Body>
        </Card>
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title={concept.title}
      lead={concept.overview}
      headerTop={(
        <Button as={Link} to="/explore" variant="outline-secondary">
          Back to Explore
        </Button>
      )}
    >
      <Row className="g-4">
        <Col lg={8}>
          <section className="mb-4" aria-labelledby="explanation-heading">
            <Card className="shadow-sm">
              <Card.Body>
                <h2 id="explanation-heading" className="h5 mb-3">
                  Explanation
                </h2>
                <p className="mb-0">{concept.explanation}</p>
              </Card.Body>
            </Card>
          </section>

          <section className="mb-4" aria-labelledby="why-it-matters-heading">
            <Card className="shadow-sm">
              <Card.Body>
                <h2 id="why-it-matters-heading" className="h5 mb-3">
                  Why It Matters
                </h2>
                <p className="mb-0">{concept.howItWorks}</p>
              </Card.Body>
            </Card>
          </section>

          <section aria-labelledby="visual-example-heading">
            <Card className="shadow-sm">
              <Card.Body>
                <h2 id="visual-example-heading" className="h5 mb-3">
                  Simple Visual Example
                </h2>
                <div
                  className="border rounded p-3 mb-3 bg-light"
                  role="img"
                  aria-label={`Simplified example layout for ${concept.title}`}
                >
                  <svg viewBox="0 0 360 160" width="100%" height="160" aria-hidden="true" focusable="false">
                    <rect x="1" y="1" width="358" height="158" fill="#ffffff" stroke="#ced4da" rx="6" />
                    <line x1="40" y1="125" x2="320" y2="125" stroke="#6c757d" strokeWidth="2" />
                    <line x1="40" y1="125" x2="40" y2="22" stroke="#6c757d" strokeWidth="2" />
                    <circle cx="85" cy="95" r="5" fill="#0d6efd" />
                    <circle cx="120" cy="82" r="5" fill="#0d6efd" />
                    <circle cx="148" cy="74" r="5" fill="#0d6efd" />
                    <rect x="210" y="70" width="10" height="10" fill="#dc3545" />
                    <rect x="245" y="58" width="10" height="10" fill="#dc3545" />
                    <rect x="275" y="66" width="10" height="10" fill="#dc3545" />
                    <line x1="62" y1="120" x2="298" y2="38" stroke="#198754" strokeWidth="3" strokeDasharray="7 5" />
                  </svg>
                </div>
                <p className="mb-0 text-secondary">{concept.example}</p>
              </Card.Body>
            </Card>
          </section>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title as="h2" className="h5">
                Continue in Visualizer
              </Card.Title>
              <Card.Text className="text-secondary">
                Open this concept with its model preselected to continue experimenting.
              </Card.Text>
              <Button as={Link} to={`/visualizer?model=${concept.modelKey}`} variant="primary">
                Open in Visualizer
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}

export default ConceptDetailPage
