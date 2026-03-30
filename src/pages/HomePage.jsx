import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'

function HomePage() {
  return (
    <PageLayout title="Welcome to VisualML">
      <Card>
        <Card.Body>
          <Card.Text>
            VisualML is an educational React app for exploring machine learning concepts with
            interactive 2D visualizations.
          </Card.Text>
          <Button as={Link} to="/visualizer" variant="primary">
            Open Visualizer
          </Button>
        </Card.Body>
      </Card>
    </PageLayout>
  )
}

export default HomePage
