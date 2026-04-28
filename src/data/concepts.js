const concepts = [
  {
    id: 'logistic-regression',
    modelKey: 'logistic-regression',
    category: 'Machine Learning',
    difficulty: 'Beginner',
    previewAlt: 'Scatter plot with a linear decision boundary separating two classes',
    title: 'Logistic Regression',
    description:
      'Learn how a linear decision boundary separates classes and why probability outputs are useful for classification.',
    overview:
      'Logistic regression is a classification model that predicts the probability that a point belongs to a class.',
    explanation:
      'Instead of outputting any real value, logistic regression maps a weighted sum of inputs through a sigmoid function. This produces a value between 0 and 1, which can be interpreted as confidence. During training, weights are updated to reduce classification error across the dataset.',
    howItWorks:
      'The model finds one boundary line in 2D that best separates classes. Points on one side are predicted as class A and points on the other side as class B, with confidence changing smoothly as points move away from the boundary.',
    example:
      'If study-time and attendance are inputs, logistic regression can estimate whether a student is likely to pass or fail based on a probability threshold.',
  },
  {
    id: 'pca',
    modelKey: 'pca',
    category: 'Mathematics',
    difficulty: 'Intermediate',
    previewAlt: 'Principal component axes showing variance direction in a point cloud',
    title: 'Principal Component Analysis (PCA)',
    description:
      'See how data can be projected onto a direction that captures the most variance.',
    overview:
      'PCA is a dimensionality reduction method that finds directions capturing the largest variation in a dataset.',
    explanation:
      'PCA rotates the coordinate system to align with the data distribution. The first principal component points along the direction where projected points spread out the most, making it useful for compression and structure discovery.',
    howItWorks:
      'Each point is projected onto the principal axis. The axis that maximizes projection variance becomes the main component, which preserves the strongest trend in the data while reducing dimensionality.',
    example:
      'For data with correlated measurements, PCA can summarize the dominant pattern with one direction while still keeping most of the variation.',
  },
  {
    id: 'knn',
    modelKey: 'knn',
    category: 'Algorithms',
    difficulty: 'Beginner',
    previewAlt: 'Nearest-neighbor classification regions around labeled sample points',
    title: 'k-Nearest Neighbors',
    description:
      'Explore how local neighborhood voting changes as k increases and how decision boundaries become smoother.',
    overview:
      'k-Nearest Neighbors (kNN) classifies a point by looking at the labels of its closest neighbors in feature space.',
    explanation:
      'kNN stores training data and delays computation until prediction time. To classify a new point, it measures distance to known points, selects the nearest k, and uses majority vote. Smaller k is sensitive to noise; larger k is smoother but can miss local detail.',
    howItWorks:
      'No explicit boundary is learned during training. The boundary emerges from local neighborhoods and distance comparisons, so data distribution strongly affects predictions.',
    example:
      'In a fruit dataset with weight and color features, kNN can classify a new sample by checking whether nearby points are mostly apples, oranges, or pears.',
  },
]

function getConceptById(id) {
  return concepts.find((concept) => concept.id === id)
}

export { concepts, getConceptById }
