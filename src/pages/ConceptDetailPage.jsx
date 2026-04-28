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
  const isKnn = concept.id === 'knn'
  const isPca = concept.id === 'pca'

  return (
    <PageLayout
      title={isKnn ? 'k-Nearest Neighbors (kNN)' : concept.title}
      lead={isKnn
        ? 'kNN is a simple algorithm that classifies a point based on the labels of its nearest neighbors.'
        : isPca
          ? 'PCA is a technique used to reduce the dimensionality of data while preserving as much variation as possible.'
          : concept.overview}
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
                      Logistic regression is a fundamental classification algorithm used to predict the probability that an input belongs to a particular category. Despite its name, it is not typically used for predicting continuous values. Instead, it is most commonly applied to binary classification problems, where the goal is to decide between two possible outcomes.
                    </p>
                    <p className="mb-0">
                      The model works by combining input features into a weighted sum and then passing that result through a sigmoid function. This transformation converts any real-valued number into a probability between 0 and 1, allowing the model to express how confident it is that a data point belongs to a certain class.
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
                      Logistic regression originated in statistics and has been used for decades as a standard method for modeling binary outcomes. It became especially important in fields like medicine, social sciences, and economics because it provides interpretable results and performs well even with relatively small datasets.
                    </p>
                    <p>
                      In real-world applications, logistic regression is often used to estimate the likelihood of an event occurring. For example, it can be used to predict whether an email is spam, whether a student will pass an exam, or whether a patient is at risk for a certain condition.
                    </p>
                    <p className="mb-0">
                      Rather than simply outputting a yes or no decision, logistic regression produces a probability score. This allows users to interpret the result as a level of confidence, which can then be thresholded depending on how strict or flexible the decision needs to be.
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
                      Logistic regression begins by computing a linear combination of the input features. This produces a score that reflects how strongly the features support one class over the other.
                    </p>

                    <Card className="border mb-3">
                      <Card.Body className="py-2">
                        <code>z = wᵀx + b</code>
                      </Card.Body>
                    </Card>
                    <p>
                      Here, x represents the input features, w represents the learned weights for each feature, and b is a bias term. Together, they produce a single value z that summarizes the input.
                    </p>

                    <Card className="border mb-3">
                      <Card.Body className="py-2">
                        <code>σ(z) = 1 / (1 + e^(-z))</code>
                      </Card.Body>
                    </Card>
                    <p>
                      The sigmoid function takes this value and maps it into a range between 0 and 1. This transformation allows the model to interpret its output as a probability.
                    </p>

                    <Card className="border mb-3">
                      <Card.Body className="py-2">
                        <code>P(y = 1 | x) = σ(wᵀx + b)</code>
                      </Card.Body>
                    </Card>
                    <p>
                      The final output represents the estimated probability that the input belongs to class 1. A common decision rule is to classify points with probability greater than 0.5 as class 1, and the rest as class 0.
                    </p>

                    <p>
                      During training, the model adjusts its weights and bias to better match the training data. It does this by comparing predicted probabilities to actual labels and gradually updating parameters to reduce the difference.
                    </p>

                    <Card className="border mb-3">
                      <Card.Body className="py-2">
                        <code>Loss = -[y log(p) + (1 - y) log(1 - p)]</code>
                      </Card.Body>
                    </Card>
                    <p className="mb-0">
                      This loss function penalizes incorrect predictions, especially when the model is highly confident but wrong. By minimizing this loss, logistic regression learns parameters that produce more accurate probability estimates across the dataset.
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
                              <li>Simple and computationally efficient</li>
                              <li>Easy to interpret compared to more complex models</li>
                              <li>Produces meaningful probability outputs</li>
                              <li>Works well when the relationship between features and outcome is approximately linear</li>
                            </ul>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6}>
                        <Card className="h-100 border">
                          <Card.Body>
                            <h3 className="h6">Limitations</h3>
                            <ul className="mb-0">
                              <li>Can only model linear decision boundaries without feature transformation</li>
                              <li>Struggles with complex, highly nonlinear relationships</li>
                              <li>Sensitive to feature scaling and outliers</li>
                              <li>May underperform compared to more flexible models on complex datasets</li>
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
                      Logistic regression is one of several models used for classification and probability estimation. While it is simple and interpretable, other models can capture more complex patterns at the cost of increased complexity or reduced interpretability.
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
          ) : isKnn ? (
            <>
              <section className="mb-4" aria-labelledby="overview-heading">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h2 id="overview-heading" className="h5 mb-3">
                      Overview
                    </h2>
                    <p>
                      k-Nearest Neighbors (kNN) is a simple and intuitive classification algorithm that makes predictions based on the similarity between data points. Unlike many models, kNN does not build an explicit model during training. Instead, it stores the training data and uses it directly when making predictions.
                    </p>
                    <p className="mb-0">
                      To classify a new point, kNN looks at the k closest data points in the dataset and determines their labels. The predicted class is typically chosen by majority vote among these neighbors. Because it relies on local structure, kNN can capture complex patterns that are difficult for linear models to represent.
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
                      kNN originates from early research in pattern recognition and has long been used as a baseline method in machine learning. Its simplicity makes it easy to understand and implement, and it remains a useful tool for comparing more complex models.
                    </p>
                    <p>
                      In real-world applications, kNN is often used in recommendation systems, image recognition, and anomaly detection. For example, a movie recommendation system might suggest films that are similar to those a user has previously enjoyed by comparing preferences to those of other users.
                    </p>
                    <p className="mb-0">
                      Because predictions are based on nearby data points, the model reflects local patterns in the dataset. This means that its behavior can change depending on how data is distributed, making it sensitive to clustering and density.
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
                        aria-label="k-nearest neighbors classification showing a test point and nearby labeled data points."
                      >
                        Placeholder image area for k-nearest neighbors visual example
                      </div>
                      <figcaption className="mt-3 text-secondary">
                        The predicted class is determined by the majority class among the nearest neighbors.
                      </figcaption>
                    </figure>
                  </Card.Body>
                </Card>
              </section>

              <section className="mb-4" aria-labelledby="math-heading">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h2 id="math-heading" className="h5 mb-3">
                      Mathematical Formulation and How It Works
                    </h2>
                    <p>
                      kNN works by measuring the distance between a query point and all points in the dataset, then selecting the closest ones.
                    </p>

                    <Card className="border mb-3">
                      <Card.Body className="py-2">
                        <code>Distance(x, xᵢ) = √Σ (xⱼ - xᵢⱼ)²</code>
                      </Card.Body>
                    </Card>
                    <p>
                      A common choice is Euclidean distance, which measures the straight-line distance between two points in space. Other distance metrics, such as Manhattan distance, can also be used depending on the problem.
                    </p>

                    <Card className="border mb-3">
                      <Card.Body className="py-2">
                        <code>ŷ = majority vote of k nearest neighbors</code>
                      </Card.Body>
                    </Card>
                    <p>
                      After computing distances, the algorithm selects the k nearest neighbors and assigns the most common label among them to the query point. This majority voting process determines the final prediction.
                    </p>

                    <p className="mb-0">
                      Unlike many machine learning models, kNN does not learn parameters during training. Instead, it simply stores the dataset. All computation happens at prediction time, which can make it slower for large datasets.
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
                              <li>Simple and intuitive</li>
                              <li>No training phase required</li>
                              <li>Can model complex decision boundaries</li>
                              <li>Flexible with different distance metrics</li>
                            </ul>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6}>
                        <Card className="h-100 border">
                          <Card.Body>
                            <h3 className="h6">Limitations</h3>
                            <ul className="mb-0">
                              <li>Slow at prediction time for large datasets</li>
                              <li>Sensitive to choice of k</li>
                              <li>Sensitive to feature scaling</li>
                              <li>Can be affected by noise</li>
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
                      kNN is a non-parametric method, meaning it does not assume a fixed form for the decision boundary. This allows it to adapt to complex data patterns, but also makes it computationally more expensive compared to models that learn compact representations.
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
                          <td>kNN</td>
                          <td>Instance-based, uses neighbors</td>
                          <td>Nonlinear</td>
                          <td>Low interpretability</td>
                        </tr>
                        <tr>
                          <td>Logistic Regression</td>
                          <td>Parametric, linear boundary</td>
                          <td>Linear</td>
                          <td>High interpretability</td>
                        </tr>
                        <tr>
                          <td>Decision Tree</td>
                          <td>Rule-based splits</td>
                          <td>Nonlinear</td>
                          <td>Medium</td>
                        </tr>
                        <tr>
                          <td>Neural Network</td>
                          <td>Learned nonlinear mapping</td>
                          <td>Nonlinear</td>
                          <td>Low</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </section>
            </>
          ) : isPca ? (
            <>
              <section className="mb-4" aria-labelledby="overview-heading">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h2 id="overview-heading" className="h5 mb-3">
                      Overview
                    </h2>
                    <p>
                      Principal Component Analysis (PCA) is a technique used to reduce the dimensionality of a dataset while preserving as much of its variation as possible. Instead of working with the original features, PCA transforms the data into a new set of variables called principal components.
                    </p>
                    <p className="mb-0">
                      These principal components are ordered so that the first captures the largest amount of variation in the data, the second captures the next largest amount, and so on. By keeping only the most important components, PCA allows us to simplify data while retaining its essential structure.
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
                      PCA is a classical statistical method that has been widely used in data analysis, signal processing, and machine learning. It provides a systematic way to understand the structure of high-dimensional data.
                    </p>
                    <p>
                      In real-world applications, PCA is often used for data compression, visualization, and noise reduction. For example, it can reduce a high-dimensional dataset to two or three dimensions for visualization, making it easier to identify patterns or clusters.
                    </p>
                    <p className="mb-0">
                      Conceptually, PCA finds the directions in which the data varies the most. These directions reveal the underlying structure of the dataset and can highlight the most important relationships between features.
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
                        aria-label="PCA projection showing data points and the principal component axis."
                      >
                        Placeholder image area for PCA visual example
                      </div>
                      <figcaption className="mt-3 text-secondary">
                        The principal component captures the direction of maximum variance in the data.
                      </figcaption>
                    </figure>
                  </Card.Body>
                </Card>
              </section>

              <section className="mb-4" aria-labelledby="math-heading">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h2 id="math-heading" className="h5 mb-3">
                      Mathematical Formulation and How It Works
                    </h2>
                    <p>
                      PCA works by identifying new axes that capture the maximum variance in the data.
                    </p>

                    <Card className="border mb-3">
                      <Card.Body className="py-2">
                        <code>Covariance matrix: Σ = (1/n) XᵀX</code>
                      </Card.Body>
                    </Card>
                    <p>
                      The covariance matrix describes how features vary together. By analyzing this matrix, PCA determines which directions contain the most information.
                    </p>

                    <Card className="border mb-3">
                      <Card.Body className="py-2">
                        <code>Σv = λv</code>
                      </Card.Body>
                    </Card>
                    <p>
                      Eigenvectors of the covariance matrix represent the directions of maximum variance, while eigenvalues indicate how important each direction is. The principal components are formed from these eigenvectors.
                    </p>

                    <Card className="border mb-3">
                      <Card.Body className="py-2">
                        <code>Z = XW</code>
                      </Card.Body>
                    </Card>
                    <p className="mb-0">
                      Once the principal components are found, the data is projected onto these new axes. This transformation creates a lower-dimensional representation of the original dataset.
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
                              <li>Reduces dimensionality effectively</li>
                              <li>Helps visualize high-dimensional data</li>
                              <li>Removes redundancy in features</li>
                              <li>Improves efficiency for downstream models</li>
                            </ul>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6}>
                        <Card className="h-100 border">
                          <Card.Body>
                            <h3 className="h6">Limitations</h3>
                            <ul className="mb-0">
                              <li>Loses interpretability of original features</li>
                              <li>Assumes linear relationships</li>
                              <li>Sensitive to scaling</li>
                              <li>Can discard useful information if misused</li>
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
                      PCA is a linear dimensionality reduction method, meaning it captures structure through straight-line relationships. While it is efficient and interpretable, other methods such as t-SNE or neural network-based approaches can capture more complex nonlinear patterns at the cost of interpretability and computational complexity.
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
                          <td>PCA</td>
                          <td>Linear dimensionality reduction</td>
                          <td>Linear projection</td>
                          <td>Medium interpretability</td>
                        </tr>
                        <tr>
                          <td>t-SNE</td>
                          <td>Nonlinear embedding</td>
                          <td>Nonlinear</td>
                          <td>Low interpretability</td>
                        </tr>
                        <tr>
                          <td>Autoencoder</td>
                          <td>Neural network compression</td>
                          <td>Nonlinear</td>
                          <td>Low</td>
                        </tr>
                        <tr>
                          <td>Feature Selection</td>
                          <td>Keeps subset of original features</td>
                          <td>None</td>
                          <td>High</td>
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
                  : isKnn
                    ? 'Open k-nearest neighbors in the Visualizer to adjust dataset size, noise, and neighborhood behavior.'
                    : isPca
                      ? 'Open PCA in the Visualizer to explore projection angle, variance, and principal axis behavior.'
                      : 'Open this concept with its model preselected to continue experimenting.'}
              </Card.Text>
              <Button
                as={Link}
                to={isLogisticRegression
                  ? '/visualizer?model=logistic-regression'
                  : isKnn
                    ? '/visualizer?model=knn'
                    : isPca
                      ? '/visualizer?model=pca'
                      : `/visualizer?model=${concept.modelKey}`}
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
