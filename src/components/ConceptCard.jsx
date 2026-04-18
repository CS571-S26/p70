import { Badge, Button, Card, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ConceptCard({
  title,
  description,
  difficulty,
  status = 'Available in Visualizer',
  learnMoreTo = '/visualizer',
  learnMoreLabel = 'Learn More',
}) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h2" className="h5">
          {title}
        </Card.Title>

        <Stack direction="horizontal" gap={2} className="mb-3 flex-wrap">
          <Badge bg="secondary" pill>
            Difficulty: {difficulty}
          </Badge>
          <Badge bg="light" text="dark" pill className="border">
            Status: {status}
          </Badge>
        </Stack>

        <Card.Text className="text-secondary">{description}</Card.Text>

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
