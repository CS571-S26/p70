import { useMemo, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'

import ConceptCard from '../components/ConceptCard'
import decisionBoundaryImage from '../assets/images/decision-boundary.webp'
import knnImage from '../assets/images/knn.webp'
import pcaImage from '../assets/images/pca.png'
import PageLayout from '../components/PageLayout'
import { concepts } from '../data/concepts'

const previewImageByConceptId = {
  'logistic-regression': decisionBoundaryImage,
  knn: knnImage,
  pca: pcaImage,
}

function ExplorePage() {
  const [categoryFilter, setCategoryFilter] = useState('All')

  const filteredConcepts = useMemo(() => {
    if (categoryFilter === 'All') {
      return concepts
    }
    return concepts.filter((concept) => concept.category === categoryFilter)
  }, [categoryFilter])

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

      <section className="mb-4" aria-labelledby="category-filter-heading">
        <Card className="shadow-sm">
          <Card.Body>
            <h2 id="category-filter-heading" className="h6 mb-3">Category Filter</h2>
            <Form.Group controlId="concept-category-filter">
              <Form.Label className="fw-semibold">Browse by category</Form.Label>
              <Form.Select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
                <option value="All">All Categories</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Algorithms">Algorithms</option>
              </Form.Select>
            </Form.Group>
          </Card.Body>
        </Card>
      </section>

      <Row className="g-4">
        {filteredConcepts.map((concept) => (
          <Col md={6} lg={4} key={concept.id}>
            <ConceptCard
              title={concept.title}
              description={concept.description}
              category={concept.category}
              difficulty={concept.difficulty}
              previewImage={previewImageByConceptId[concept.id]}
              previewAlt={concept.previewAlt}
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
