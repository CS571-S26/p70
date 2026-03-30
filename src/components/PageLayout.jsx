import Container from 'react-bootstrap/Container'
import AppNavbar from './AppNavbar'

function PageLayout({ title, children }) {
  return (
    <>
      <AppNavbar />
      <main>
        <Container className="py-4">
          <h1 className="h3 mb-4">{title}</h1>
          {children}
        </Container>
      </main>
    </>
  )
}

export default PageLayout
