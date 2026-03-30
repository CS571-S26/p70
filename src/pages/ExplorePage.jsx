import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import PageLayout from '../components/PageLayout'

const concepts = [
  {
    id: 'logistic-regression',
    title: 'Logistic Regression',
    difficulty: 'Beginner',
    description: 'See how a linear boundary separates classes and how gradient updates refine it.',
  },
  {
    id: 'knn',
    title: 'k-Nearest Neighbors',
    difficulty: 'Beginner',
    description: 'Compare local neighborhood voting decisions under different k values.',
  },
]

function ExplorePage() {
  return (
    <PageLayout
      title="Explore Concepts"
      lead="Browse key topics before opening a model in the visualizer."
    >
      <Row className="g-4">
        {concepts.map((concept) => (
          <Col md={6} key={concept.id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title as="h2" className="h5">{concept.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Difficulty: {concept.difficulty}</Card.Subtitle>
                <Card.Text>{concept.description}</Card.Text>
                <Card.Link as={Link} to="/visualizer">Open in Visualizer</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}

export default ExplorePage
