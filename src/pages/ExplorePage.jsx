import { Card, Col, Row } from 'react-bootstrap'

import ConceptCard from '../components/ConceptCard'
import PageLayout from '../components/PageLayout'
import { concepts } from '../data/concepts'

function ExplorePage() {
  return (
    <PageLayout
      title="Explore Concepts"
      lead="Browse foundational machine learning concepts, compare their goals, and then continue learning in the visualizer."
    >
      <section className="mb-4" aria-labelledby="explore-intro-heading">
        <Card className="border-0 bg-light">
          <Card.Body>
            <h2 id="explore-intro-heading" className="h5 mb-2">
              Models and Techniques
            </h2>
            <p className="mb-0 text-secondary">
              Each card introduces a machine learning concept you can experiment with. Use Learn
              More to read the concept and continue directly in the Visualizer.
            </p>
          </Card.Body>
        </Card>
      </section>

      <Row className="g-4">
        {concepts.map((concept) => (
          <Col md={6} lg={4} key={concept.id}>
            <ConceptCard
              title={concept.title}
              description={concept.description}
              difficulty={concept.difficulty}
              status="Detail page available"
              learnMoreTo={`/explore/${concept.id}`}
              learnMoreLabel="Learn More"
            />
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}

export default ExplorePage
