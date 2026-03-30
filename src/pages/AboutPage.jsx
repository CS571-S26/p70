import Card from 'react-bootstrap/Card'
import PageLayout from '../components/PageLayout'

function AboutPage() {
  return (
    <PageLayout
      title="About VisualML"
      lead="VisualML is an educational course project for learning machine learning behavior through interaction."
    >
      <Card>
        <Card.Body>
          <Card.Title as="h2" className="h5">Project Snapshot</Card.Title>
          <Card.Text className="mb-2">
            Built with React, React-Bootstrap, and client-side routing for GitHub Pages deployment.
          </Card.Text>
          <Card.Text className="text-muted mb-0">
            This milestone focuses on navigation, page structure, reusable components, and accessible controls.
          </Card.Text>
        </Card.Body>
      </Card>
    </PageLayout>
  )
}

export default AboutPage
