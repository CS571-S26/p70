import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home', end: true, enabled: true },
  { to: '/explore', label: 'Explore', enabled: false },
  { to: '/visualizer', label: 'Visualizer', enabled: true },
  { to: '/settings', label: 'Settings', enabled: false },
  { to: '/about', label: 'About', enabled: false },
]

function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="border-bottom" aria-label="Primary" collapseOnSelect>
      <Container>
        <Navbar.Brand as={NavLink} to="/" end>
          VisualML
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto" aria-label="Main navigation links">
            {navItems.map((item) =>
              item.enabled ? (
                <Nav.Link
                  key={item.to}
                  as={NavLink}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => (isActive ? 'fw-semibold text-decoration-underline' : undefined)}
                >
                  {item.label}
                </Nav.Link>
              ) : (
                <Nav.Link
                  key={item.to}
                  as="span"
                  disabled
                  aria-disabled="true"
                  title="Planned for a later milestone"
                  className="text-muted"
                >
                  {item.label} (Soon)
                </Nav.Link>
              ),
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
