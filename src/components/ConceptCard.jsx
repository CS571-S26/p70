import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ConceptCard({
  title,
  description,
  learnMoreTo = '/visualizer',
  learnMoreLabel = 'Learn More',
}) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h2" className="h5">
          {title}
        </Card.Title>

        <Card.Text className="text-secondary mb-3">{description}</Card.Text>

        <div className="mt-auto">
          <Button as={Link} to={learnMoreTo} variant="outline-primary">
            {learnMoreLabel}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ConceptCard
