import { Button, Card, Col, Form, Row } from 'react-bootstrap'

import PageLayout from '../components/PageLayout'
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
              <Card.Title as="h2" className="h5 mb-3">Appearance</Card.Title>
              <Form.Group className="mb-4" controlId="theme-select">
                <Form.Label className="fw-semibold">Theme</Form.Label>
                <Form.Select
                  value={settings.theme}
                  onChange={(event) => updateSetting('theme', event.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </Form.Select>
                <Form.Text muted>
                  Applies a global site theme through body-level theme attributes.
                </Form.Text>
              </Form.Group>

              <Card.Title as="h2" className="h5 mb-3">Accessibility</Card.Title>
              <Form.Group className="mb-3" controlId="high-contrast-toggle">
                <Form.Check
                  type="switch"
                  label="Enable high contrast mode"
                  checked={settings.highContrast}
                  onChange={(event) => updateSetting('highContrast', event.target.checked)}
                />
              </Form.Group>

              <Form.Group className="mb-0" controlId="reduced-motion-toggle">
                <Form.Check
                  type="switch"
                  label="Enable reduced motion"
                  checked={settings.reducedMotion}
                  onChange={(event) => updateSetting('reducedMotion', event.target.checked)}
                />
                <Form.Text muted>
                  Reduced motion disables animations and transitions where they are used. This may not visibly change static pages.
                </Form.Text>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-3 p-md-4">
              <Card.Title as="h2" className="h5 mb-3">Visualizer Defaults</Card.Title>

              <Form.Group className="mb-3" controlId="default-model-select">
                <Form.Label className="fw-semibold">Default Model</Form.Label>
                <Form.Select
                  value={settings.defaultModel}
                  onChange={(event) => updateSetting('defaultModel', event.target.value)}
                >
                  <option value="logistic-regression">Logistic Regression</option>
                  <option value="knn">k-Nearest Neighbors</option>
                  <option value="pca">Principal Component Analysis (PCA)</option>
                </Form.Select>
                <Form.Text muted>
                  Used when opening the Visualizer without a model query parameter.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="default-dataset-size">
                <Form.Label className="fw-semibold">
                  Default Dataset Size ({settings.defaultDatasetSize} points)
                </Form.Label>
                <Form.Range
                  min={20}
                  max={500}
                  step={10}
                  value={settings.defaultDatasetSize}
                  onChange={(event) => updateSetting('defaultDatasetSize', Number(event.target.value))}
                />
              </Form.Group>

              <Form.Group className="mb-0" controlId="default-noise-level">
                <Form.Label className="fw-semibold">
                  Default Noise ({settings.defaultNoise.toFixed(2)})
                </Form.Label>
                <Form.Range
                  min={0}
                  max={1}
                  step={0.01}
                  value={settings.defaultNoise}
                  onChange={(event) => updateSetting('defaultNoise', Number(event.target.value))}
                />
              </Form.Group>
            </Card.Body>
          </Card>

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
