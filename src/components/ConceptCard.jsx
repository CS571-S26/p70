import { Badge, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ConceptCard({
  title,
  description,
  difficulty,
  category,
  previewImage,
  previewAlt,
  learnMoreTo = '/visualizer',
  learnMoreLabel = 'Learn More',
}) {
  return (
    <Card className="h-100 shadow-sm">
      {previewImage ? (
        <Card.Img
          variant="top"
          src={previewImage}
          alt={previewAlt || `${title} preview`}
          style={{ objectFit: 'cover', maxHeight: '180px' }}
        />
      ) : null}
      <Card.Body className="d-flex flex-column">
        <div className="d-flex flex-wrap gap-2 mb-2">
          {category ? <Badge bg="secondary-subtle" text="dark">{category}</Badge> : null}
          {difficulty ? <Badge bg="info-subtle" text="dark">Difficulty: {difficulty}</Badge> : null}
        </div>
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
