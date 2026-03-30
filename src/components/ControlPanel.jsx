import { Card, Form } from 'react-bootstrap'

function ControlPanel() {
  return (
    <Card>
      <Card.Body>
        <Card.Title as="h2" className="h5">Control Panel</Card.Title>
        <Card.Text className="text-muted">
          Starter controls for Phase B. Full behavior will be added later.
        </Card.Text>

        <Form>
          <Form.Group className="mb-3" controlId="learning-rate">
            <Form.Label>Learning Rate</Form.Label>
            <Form.Range min={0.01} max={1} step={0.01} defaultValue={0.1} />
          </Form.Group>

          <Form.Group controlId="dataset-size">
            <Form.Label>Dataset Size</Form.Label>
            <Form.Range min={20} max={200} step={5} defaultValue={80} />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default ControlPanel
