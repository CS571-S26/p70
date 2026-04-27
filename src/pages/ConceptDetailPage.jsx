import { Button, Card, Col, Row, Table } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

import PageLayout from '../components/PageLayout'
import { getConceptById } from '../data/concepts'

function ConceptDetailPage() {
  const { id } = useParams()
  const concept = getConceptById(id)

  if (!concept) {
    return (
      <PageLayout
        title="Concept Not Found"
        lead="We could not find that concept. Try returning to Explore to pick a valid topic."
        headerTop={(
          <Button as={Link} to="/explore" variant="outline-secondary">
            Back to Explore
          </Button>
        )}
      >
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Text className="mb-3">
              The concept id <code>{id}</code> is not available yet.
            </Card.Text>
            <div className="d-flex flex-wrap gap-2">
              <Button as={Link} to="/visualizer" variant="outline-primary">
                Open Visualizer
              </Button>
            </div>
          </Card.Body>
        </Card>
      </PageLayout>
    )
  }

  const isLogisticRegression = concept.id === 'logistic-regression'

  return (
    <PageLayout
      title={concept.title}
      lead={concept.overview}
      headerTop={(
        <Button as={Link} to="/explore" variant="outline-secondary">
          Back to Explore
        </Button>
      )}
    >
      <Row className="g-4">
        <Col lg={8}>
          {isLogisticRegression ? (
            <>
              <section className="mb-4" aria-labelledby="overview-heading">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h2 id="overview-heading" className="h5 mb-3">
                      Overview
                    </h2>
                    <p>
                      [PLACEHOLDER: Write a beginner-friendly explanation of logistic regression as a classification method. Explain that despite the word “regression,” it is commonly used for classification.]
                    </p>
                    <p className="mb-0">
                      [PLACEHOLDER: Explain that logistic regression combines input features linearly, then passes the result through a sigmoid function to produce a probability between 0 and 1.]
                    </p>
                  </Card.Body>
                </Card>
              </section>

              <section className="mb-4" aria-labelledby="history-heading">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h2 id="history-heading" className="h5 mb-3">
                      History and Real-World Interpretation
                    </h2>
                    <p>
                      [PLACEHOLDER: Briefly describe the historical role of logistic regression in statistics and machine learning. Mention that it has been widely used because it is simple, interpretable, and effective for binary classification.]
                    </p>
                    <p>
                      [PLACEHOLDER: Explain a real-world interpretation. For example, a model might estimate whether an email is spam, whether a student is likely to pass, or whether a patient belongs to a risk group.]
                    </p>
                    <p className="mb-0">
                      [PLACEHOLDER: Explain that the model output should be understood as a probability or confidence score, not just a hard yes/no answer.]
                    </p>
                  </Card.Body>
                </Card>
              </section>

              <section className="mb-4" aria-labelledby="visual-example-heading">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h2 id="visual-example-heading" className="h5 mb-3">
                      Visual Example
                    </h2>
                    <figure className="mb-0">
                      <div
                        className="border rounded p-4 bg-light text-center"
                        role="img"
                        aria-label="Static illustration of logistic regression separating two classes with a linear decision boundary."
                      >
                        Placeholder image area for logistic regression visual example
                      </div>
                      <figcaption className="mt-3 text-secondary">
                        A logistic regression model often appears as a line separating two groups of points in a 2D visualization. Points farther from the boundary usually correspond to higher confidence predictions.
                      </figcaption>
                    </figure>
                  </Card.Body>
                </Card>
              </section>

              <section className="mb-4" aria-labelledby="math-heading">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h2 id="math-heading" className="h5 mb-3">
                      Mathematical Formulation and How It Learns
                    </h2>
                    <p>
                      [PLACEHOLDER: Explain that logistic regression first computes a weighted linear score from the input features.]
                    </p>

                    <Card className="border mb-3">
                      <Card.Body className="py-2">
                        <code>z = wᵀx + b</code>
                      </Card.Body>
                    </Card>
                    <p>
                      [PLACEHOLDER: Explain that x represents the input features, w represents learned weights, and b is the bias term.]
                    </p>

                    <Card className="border mb-3">
                      <Card.Body className="py-2">
                        <code>σ(z) = 1 / (1 + e^(-z))</code>
                      </Card.Body>
                    </Card>
                    <p>
                      [PLACEHOLDER: Explain that the sigmoid function squashes any real-valued score into a number between 0 and 1.]
                    </p>

                    <Card className="border mb-3">
                      <Card.Body className="py-2">
                        <code>P(y = 1 | x) = σ(wᵀx + b)</code>
                      </Card.Body>
                    </Card>
                    <p>
                      [PLACEHOLDER: Explain that the output can be interpreted as the predicted probability of class 1.]
                    </p>

                    <p>
                      [PLACEHOLDER: Explain that during training, the model adjusts w and b to reduce prediction error across the dataset.]
                    </p>

                    <Card className="border mb-3">
                      <Card.Body className="py-2">
                        <code>Loss = -[y log(p) + (1 - y) log(1 - p)]</code>
                      </Card.Body>
                    </Card>
                    <p className="mb-0">
                      [PLACEHOLDER: Explain that this loss penalizes confident wrong predictions more heavily than uncertain predictions.]
                    </p>
                  </Card.Body>
                </Card>
              </section>

              <section className="mb-4" aria-labelledby="strengths-limitations-heading">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h2 id="strengths-limitations-heading" className="h5 mb-3">
                      Strengths and Limitations
                    </h2>
                    <Row className="g-3">
                      <Col md={6}>
                        <Card className="h-100 border">
                          <Card.Body>
                            <h3 className="h6">Strengths</h3>
                            <ul className="mb-0">
                              <li>Simple and fast to train</li>
                              <li>Easy to interpret compared with many complex models</li>
                              <li>Produces probability-like outputs</li>
                              <li>Works well when classes are roughly linearly separable</li>
                            </ul>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6}>
                        <Card className="h-100 border">
                          <Card.Body>
                            <h3 className="h6">Limitations</h3>
                            <ul className="mb-0">
                              <li>Assumes a mostly linear decision boundary</li>
                              <li>Struggles with complex nonlinear patterns without feature engineering</li>
                              <li>Sensitive to poorly scaled features</li>
                              <li>Can underfit when the real relationship is highly complex</li>
                            </ul>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </section>

              <section aria-labelledby="comparison-heading">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h2 id="comparison-heading" className="h5 mb-3">
                      Comparison with Similar Models
                    </h2>
                    <p>
                      [PLACEHOLDER: Explain that logistic regression is one of several models used for classification or probability estimation. The models below serve similar purposes but make different assumptions.]
                    </p>
                    <Table responsive bordered hover className="mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Model</th>
                          <th scope="col">Main Idea</th>
                          <th scope="col">Decision Boundary</th>
                          <th scope="col">Interpretability</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Logistic Regression</td>
                          <td>Learns a weighted linear score and maps it to probability</td>
                          <td>Linear</td>
                          <td>High</td>
                        </tr>
                        <tr>
                          <td>Linear SVM</td>
                          <td>Finds a separating margin between classes</td>
                          <td>Linear</td>
                          <td>Medium</td>
                        </tr>
                        <tr>
                          <td>Decision Tree</td>
                          <td>Splits data using feature thresholds</td>
                          <td>Piecewise rectangular</td>
                          <td>Medium to High</td>
                        </tr>
                        <tr>
                          <td>Naive Bayes</td>
                          <td>Uses probability assumptions about features</td>
                          <td>Usually nonlinear in feature space</td>
                          <td>Medium</td>
                        </tr>
                        <tr>
                          <td>Neural Network</td>
                          <td>Learns layered nonlinear transformations</td>
                          <td>Nonlinear</td>
                          <td>Low</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </section>
            </>
          ) : (
            <>
              <section className="mb-4" aria-labelledby="explanation-heading">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h2 id="explanation-heading" className="h5 mb-3">
                      Explanation
                    </h2>
                    <p className="mb-0">{concept.explanation}</p>
                  </Card.Body>
                </Card>
              </section>

              <section className="mb-4" aria-labelledby="why-it-matters-heading">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h2 id="why-it-matters-heading" className="h5 mb-3">
                      Why It Matters
                    </h2>
                    <p className="mb-0">{concept.howItWorks}</p>
                  </Card.Body>
                </Card>
              </section>

              <section aria-labelledby="visual-example-heading">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h2 id="visual-example-heading" className="h5 mb-3">
                      Simple Visual Example
                    </h2>
                    <div
                      className="border rounded p-3 mb-3 bg-light"
                      role="img"
                      aria-label={`Simplified example layout for ${concept.title}`}
                    >
                      <svg viewBox="0 0 360 160" width="100%" height="160" aria-hidden="true" focusable="false">
                        <rect x="1" y="1" width="358" height="158" fill="#ffffff" stroke="#ced4da" rx="6" />
                        <line x1="40" y1="125" x2="320" y2="125" stroke="#6c757d" strokeWidth="2" />
                        <line x1="40" y1="125" x2="40" y2="22" stroke="#6c757d" strokeWidth="2" />
                        <circle cx="85" cy="95" r="5" fill="#0d6efd" />
                        <circle cx="120" cy="82" r="5" fill="#0d6efd" />
                        <circle cx="148" cy="74" r="5" fill="#0d6efd" />
                        <rect x="210" y="70" width="10" height="10" fill="#dc3545" />
                        <rect x="245" y="58" width="10" height="10" fill="#dc3545" />
                        <rect x="275" y="66" width="10" height="10" fill="#dc3545" />
                        <line x1="62" y1="120" x2="298" y2="38" stroke="#198754" strokeWidth="3" strokeDasharray="7 5" />
                      </svg>
                    </div>
                    <p className="mb-0 text-secondary">{concept.example}</p>
                  </Card.Body>
                </Card>
              </section>
            </>
          )}
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title as="h2" className="h5">
                Continue in Visualizer
              </Card.Title>
              <Card.Text className="text-secondary">
                {isLogisticRegression
                  ? 'Open logistic regression in the Visualizer to adjust dataset size, noise, and the decision boundary display.'
                  : 'Open this concept with its model preselected to continue experimenting.'}
              </Card.Text>
              <Button
                as={Link}
                to={isLogisticRegression ? '/visualizer?model=logistic-regression' : `/visualizer?model=${concept.modelKey}`}
                variant="primary"
              >
                Open in Visualizer
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}

export default ConceptDetailPage
