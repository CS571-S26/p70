const concepts = [
  {
    id: 'logistic-regression',
    modelKey: 'logistic-regression',
    title: 'Logistic Regression',
    difficulty: 'Beginner',
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
    id: 'perceptron',
    modelKey: 'perceptron',
    title: 'Perceptron',
    difficulty: 'Beginner',
    description:
      'Understand step-based updates and how the perceptron adjusts weights when points are classified incorrectly.',
    overview:
      'The perceptron is one of the earliest binary classifiers and builds a linear decision boundary through iterative updates.',
    explanation:
      'For each training example, the perceptron predicts a class using the sign of a weighted sum. If the prediction is wrong, it nudges the weights and bias in the direction that would make that example more likely to be classified correctly next time.',
    howItWorks:
      'The algorithm loops through data repeatedly. Correct predictions leave weights unchanged; incorrect predictions trigger updates. Over time, the boundary rotates and shifts to reduce mistakes on linearly separable datasets.',
    example:
      'For a spam detector with simple word-count features, the perceptron strengthens weights for words common in spam and weakens weights for words common in non-spam.',
  },
  {
    id: 'knn',
    modelKey: 'knn',
    title: 'k-Nearest Neighbors',
    difficulty: 'Beginner',
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
