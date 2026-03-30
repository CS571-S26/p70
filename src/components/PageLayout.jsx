import Container from 'react-bootstrap/Container'
import AppNavbar from './AppNavbar'

function PageLayout({ title, lead, children, footer }) {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <AppNavbar />
      <main className="flex-grow-1">
        <Container className="py-4 py-md-5">
          <header className="mb-4">
            <h1 className="h3 mb-2">{title}</h1>
            {lead ? <p className="text-muted mb-0">{lead}</p> : null}
          </header>
          {children}
        </Container>
      </main>

      {footer ? (
        <footer className="border-top">
          <Container className="py-3 text-muted small">{footer}</Container>
        </footer>
      ) : (
        <div className="pb-3" aria-hidden="true" />
      )}
    </div>
  )
}

export default PageLayout
