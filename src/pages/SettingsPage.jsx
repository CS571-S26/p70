import { Card, Form } from 'react-bootstrap'

import PageLayout from '../components/PageLayout'

function SettingsPage() {
  return (
    <PageLayout
      title="Settings"
      lead="Global preferences and accessibility options will persist in localStorage in later phases."
    >
      <Card>
        <Card.Body>
          <Card.Title as="h2" className="h5">Accessibility Preferences</Card.Title>
          <Form>
            <Form.Check type="switch" id="reduced-motion" label="Reduced motion" className="mb-2" />
            <Form.Check type="switch" id="high-contrast" label="High contrast mode" />
          </Form>
        </Card.Body>
      </Card>
    </PageLayout>
  )
}

export default SettingsPage
