import { Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function AppFooter({ note }) {
  return (
    <footer className="border-top">
      <Container className="py-3">
        <div className="small text-muted d-flex flex-column gap-2">
          <div className="d-flex flex-wrap gap-3">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/settings">Settings</NavLink>
            <NavLink to="/about">About</NavLink>
          </div>
          <div>VisualML — Interactive Machine Learning Visualization</div>
          <div>Accessibility note: Use Settings to adjust theme, contrast, and motion preferences.</div>
          {note ? <div>{note}</div> : null}
        </div>
      </Container>
    </footer>
  )
}

export default AppFooter
