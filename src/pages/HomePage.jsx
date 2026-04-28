import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import decisionBoundaryImage from '../assets/images/decision-boundary.webp'
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
            <Row className="g-4 align-items-center">
              <Col md={7}>
                <h2 className="h3 mb-3">Learn Machine Learning by Seeing It Move</h2>
                <p className="mb-0 text-secondary">
                  VisualML helps you connect model concepts to interactive 2D visualizations. Adjust datasets,
                  switch models, and see how parameters change the behavior of common machine learning algorithms.
                </p>
                <div className="d-flex flex-wrap gap-2 mt-4">
                  <Button as={Link} to="/visualizer" variant="primary" size="lg">
                    Start Experimenting
                  </Button>
                  <Button as={Link} to="/explore" variant="outline-primary" size="lg">
                    Learn the Concepts First
                  </Button>
                </div>
              </Col>
              <Col md={5}>
                <Card className="shadow-sm">
                  <Card.Body className="text-center">
                    <img
                      src={decisionBoundaryImage}
                      alt="Decision boundary separating two classes in a 2D classification problem"
                      className="img-fluid rounded"
                    />
                    <div className="text-muted small mt-2">
                      A preview of how models separate data into different classes.
                    </div>
                    <div className="text-muted small">
                      Source:{' '}
                      <a
                        href="https://media.geeksforgeeks.org/wp-content/uploads/20250804203325949273/Visualizing-Classifier-Decision-Boundaries.webp"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GeeksforGeeks
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </section>

      <section>
        <h2 className="h5 mb-3">What You Can Explore</h2>
        <Row className="g-3 g-md-4">
          <Col md={6} lg={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title as="h3" className="h6">See How Noise Changes a Boundary</Card.Title>
                <Card.Text className="mb-0 text-secondary">
                  Increase dataset noise and watch how classification becomes less certain.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title as="h3" className="h6">Compare Model Behavior</Card.Title>
                <Card.Text className="mb-0 text-secondary">
                  Switch between Logistic Regression, kNN, and PCA to see how different algorithms represent structure.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={12} lg={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title as="h3" className="h6">Read the Model Summary</Card.Title>
                <Card.Text className="mb-0 text-secondary">
                  Use the explanation panel to connect every control change with what the visualization is showing.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      <section className="mt-4 mt-md-5" aria-labelledby="why-visualml-heading">
        <Card className="border-0 bg-light">
          <Card.Body className="p-4">
            <h2 id="why-visualml-heading" className="h5 mb-2">Why VisualML?</h2>
            <p className="mb-0 text-secondary">
              Machine learning is often introduced through equations and definitions, but intuition comes
              from seeing how models behave. VisualML gives learners a low-friction way to experiment with
              datasets, parameters, and visual outcomes directly in the browser.
            </p>
          </Card.Body>
        </Card>
      </section>
    </PageLayout>
  )
}

export default HomePage
