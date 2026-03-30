import { Button, Col, Row, Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import PageLayout from '../components/PageLayout'

function HomePage() {
  return (
    <PageLayout
      title="VisualML: Learn Machine Learning Through Interaction"
      lead="VisualML is a browser-based learning experience where you explore core machine learning ideas with interactive 2D visualizations instead of only static notes."
    >
      <Row className="g-4">
        <Col lg={7}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title as="h2" className="h4 mb-3">
                Turn Concepts Into Intuition
              </Card.Title>
              <Card.Text>
                Generate simple datasets, adjust model controls, and watch how decision behavior
                changes in real time. The goal is to help you understand what a model is doing and
                why, step by step.
              </Card.Text>
              <div className="d-flex flex-wrap gap-2 mt-3">
                <Button as={Link} to="/visualizer" variant="primary">
                  Open Visualizer
                </Button>
                <Button as={Link} to="/explore" variant="outline-primary">
                  Explore Concepts
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title as="h2" className="h5 mb-3">
                What You Can Do
              </Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>Browse foundational topics from machine learning and math</ListGroup.Item>
              <ListGroup.Item>Experiment with model parameters using interactive controls</ListGroup.Item>
              <ListGroup.Item>Interpret visual and text feedback to build model intuition</ListGroup.Item>
              <ListGroup.Item>Move from concept reading to hands-on visualization quickly</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}

export default HomePage
