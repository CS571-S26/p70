import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/explore', label: 'Explore' },
  { to: '/visualizer', label: 'Visualizer' },
  { to: '/settings', label: 'Settings' },
  { to: '/about', label: 'About' },
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
          <Nav className="ms-auto">
            {navItems.map((item) => (
              <Nav.Link
                key={item.to}
                as={NavLink}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? 'fw-semibold text-decoration-underline' : undefined)}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
