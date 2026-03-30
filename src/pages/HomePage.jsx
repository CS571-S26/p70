import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import PageLayout from '../components/PageLayout'

function HomePage() {
  return (
    <PageLayout
      title="VisualML"
      lead="Understand machine learning concepts through interactive 2D visuals, guided controls, and clear model feedback."
    >
      <section className="mb-4 mb-md-5">
        <Card className="border-0 shadow-sm bg-white">
          <Card.Body className="p-4 p-md-5">
            <Badge bg="primary" className="mb-3">
              Phase B
            </Badge>
            <h2 className="h3 mb-3">Learn ML by Experimenting, Not Memorizing</h2>
            <p className="mb-0 text-secondary">
              VisualML helps you move from abstract definitions to intuition by adjusting dataset and
              model settings and seeing how behavior changes. Start with the visualizer or browse
              concepts as we expand the learning path.
            </p>
            <div className="d-flex flex-wrap gap-2 mt-4">
              <Button as={Link} to="/visualizer" variant="primary" size="lg">
                Open Visualizer
              </Button>
              <Button
                as={Link}
                to="/explore"
                variant="outline-primary"
                size="lg"
                disabled
                aria-describedby="explore-availability"
              >
                Explore Concepts
              </Button>
            </div>
            <p id="explore-availability" className="small text-muted mt-2 mb-0">
              Explore Concepts will be enabled in a later milestone.
            </p>
          </Card.Body>
        </Card>
      </section>

      <section>
        <h2 className="h5 mb-3">What You Can Do Right Now</h2>
        <Row className="g-3 g-md-4">
          <Col md={6} lg={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title as="h3" className="h6">Tune Dataset Settings</Card.Title>
                <Card.Text className="mb-0 text-secondary">
                  Change dataset size and noise to see how these inputs shape the learning problem.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title as="h3" className="h6">Switch Model Types</Card.Title>
                <Card.Text className="mb-0 text-secondary">
                  Compare model choices and observe how each one frames classification behavior.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={12} lg={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title as="h3" className="h6">Read Live Configuration</Card.Title>
                <Card.Text className="mb-0 text-secondary">
                  Use the summary panel to connect control changes with what the visualization is
                  currently configured to display.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="mt-4 border-0 bg-light">
          <Card.Body>
            <Card.Title as="h3" className="h6">Planned Next</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-light px-0">Explore concept browsing and detail pages</ListGroup.Item>
              <ListGroup.Item className="bg-light px-0">Richer model-specific visual states</ListGroup.Item>
              <ListGroup.Item className="bg-light px-0">Saved preferences and accessibility settings</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </section>
    </PageLayout>
  )
}

export default HomePage
