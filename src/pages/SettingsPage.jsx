import { Button, Card, Col, Row } from 'react-bootstrap'

import PageLayout from '../components/PageLayout'
import SettingsPanel from '../components/SettingsPanel'
import { useSettings } from '../context/SettingsContext'

function SettingsPage() {
  const { settings, updateSetting, resetAllSettings } = useSettings()

  return (
    <PageLayout
      title="Settings"
      lead="Customize appearance, accessibility, and default Visualizer parameters. Changes are saved automatically."
    >
      <Row className="g-4">
        <Col lg={7}>
          <Card className="shadow-sm">
            <Card.Body className="p-3 p-md-4">
              <SettingsPanel settings={settings} updateSetting={updateSetting} />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="border-0 bg-light">
            <Card.Body className="p-3 p-md-4">
              <Card.Title as="h2" className="h6 mb-2">Restore Defaults</Card.Title>
              <Card.Text className="text-secondary mb-3">
                Reset all preferences to the original defaults for theme, accessibility, and Visualizer settings.
              </Card.Text>
              <Button variant="outline-secondary" onClick={resetAllSettings}>
                Reset to Defaults
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}

export default SettingsPage
