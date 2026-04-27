import { Container } from 'react-bootstrap'

import AppFooter from './AppFooter'
import AppNavbar from './AppNavbar'

function PageLayout({ title, lead, children, footer, headerTop }) {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <AppNavbar />
      <main className="flex-grow-1">
        <Container className="py-4 py-md-5">
          <header className="mb-4">
            {headerTop ? <div className="mb-3">{headerTop}</div> : null}
            <h1 className="h3 mb-2">{title}</h1>
            {lead ? <p className="text-muted mb-0">{lead}</p> : null}
          </header>
          {children}
        </Container>
      </main>

      <AppFooter note={footer} />
    </div>
  )
}

export default PageLayout
