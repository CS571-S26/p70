import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import PageLayout from '../components/PageLayout'

function AboutPage() {
  return (
    <PageLayout
      title="About VisualML"
      lead="VisualML is a client-side educational web app that helps learners understand machine learning behavior through interactive visual exploration."
    >
      <section className="mb-4 mb-md-5" aria-labelledby="about-overview-heading">
        <Card className="border-0 shadow-sm bg-white">
          <Card.Body className="p-4 p-md-5">
            <Badge bg="primary" className="mb-3">Project Overview</Badge>
            <h2 id="about-overview-heading" className="h4 mb-3">Why VisualML Exists</h2>
            <p className="mb-0 text-secondary">
              Many machine learning ideas are hard to absorb from formulas alone. VisualML was built
              to make these ideas easier to understand by turning them into interactive, visual
              experiences where users can see how model behavior changes as inputs and parameters are
              adjusted.
            </p>
            <nav className="d-flex flex-wrap gap-2 mt-4" aria-label="About page quick actions">
              <Button as={Link} to="/visualizer" variant="primary">
                Open Visualizer
              </Button>
              <Button as={Link} to="/" variant="outline-primary">
                Go Home
              </Button>
            </nav>
          </Card.Body>
        </Card>
      </section>

      <section className="mb-4" aria-labelledby="project-purpose-heading">
        <h2 id="project-purpose-heading" className="h5 mb-3">Project Purpose</h2>
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Text className="mb-2">
              VisualML is designed to support concept-first learning for common machine learning
              models in a browser-only environment.
            </Card.Text>
            <Card.Text className="mb-0 text-secondary">
              The project emphasizes approachable explanations, interactive controls, and accessible
              UI patterns so students can build intuition, not just memorize definitions.
            </Card.Text>
          </Card.Body>
        </Card>
      </section>

      <section className="mb-4" aria-labelledby="key-features-heading">
        <h2 id="key-features-heading" className="h5 mb-3">Key Features</h2>
        <Row className="g-3 g-md-4">
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title as="h3" className="h6">Interactive Visualization</Card.Title>
                <Card.Text className="mb-0 text-secondary">
                  Users can inspect mock and evolving model views in 2D to understand behavior over
                  time.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title as="h3" className="h6">Control-Driven Exploration</Card.Title>
                <Card.Text className="mb-0 text-secondary">
                  Dataset size, noise, model choice, and overlays can be adjusted directly in the UI.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title as="h3" className="h6">Multi-Page Learning Flow</Card.Title>
                <Card.Text className="mb-0 text-secondary">
                  The product structure supports a clear learning progression from overview to hands-on experimentation.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title as="h3" className="h6">Client-Side Deployment</Card.Title>
                <Card.Text className="mb-0 text-secondary">
                  Everything runs in the browser and remains compatible with static GitHub Pages hosting.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      <section className="mb-4" aria-labelledby="how-to-use-heading">
        <h2 id="how-to-use-heading" className="h5 mb-3">How to Use the Site</h2>
        <Card className="shadow-sm">
          <Card.Body>
            <ListGroup as="ol" variant="flush">
              <ListGroup.Item className="px-0">Start on Home to understand the project goals.</ListGroup.Item>
              <ListGroup.Item className="px-0">Open the Visualizer to adjust controls and inspect behavior.</ListGroup.Item>
              <ListGroup.Item className="px-0">Read the live configuration summary to connect settings with outcomes.</ListGroup.Item>
              <ListGroup.Item className="px-0">Use the About page as a quick reference for project goals and feature scope.</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </section>

      <section aria-labelledby="course-context-heading">
        <h2 id="course-context-heading" className="h5 mb-3">Course and Author Context</h2>
        <Card className="border-0 bg-light">
          <Card.Body>
            <Card.Text className="mb-2">
              VisualML is a semester project for a Building User Interfaces course, focused on React,
              reusable components, routing, accessibility, and polished interaction design.
            </Card.Text>
            <Card.Text className="mb-0 text-secondary">
              The project is intentionally scoped to be educational, undergrad-feasible, and fully
              client-side with no backend dependency for core functionality.
            </Card.Text>
          </Card.Body>
        </Card>
      </section>
    </PageLayout>
  )
}

export default AboutPage
