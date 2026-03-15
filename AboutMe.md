# VisualML

VisualML is an interactive, client-side web application designed to help users understand how common machine learning algorithms behave through visualization and experimentation. Instead of learning models purely through equations or static diagrams, VisualML allows users to generate datasets, train models, and watch how decision boundaries evolve in real time.

The application is built entirely with **React** and **React-Bootstrap** and runs fully in the browser. It is designed to be deployed on **GitHub Pages**, requiring no backend infrastructure. All data generation, training, and visualization are performed client-side.

---

## Project Goals

Machine learning concepts such as decision boundaries, gradient descent, and model convergence are often difficult to understand from textbooks alone. VisualML aims to make these concepts more intuitive by:

- Providing **interactive visualizations of model behavior**
- Allowing users to **generate and manipulate datasets**
- Showing **animated training processes**
- Enabling users to **replay and inspect model evolution step-by-step**

The project emphasizes **interactive UI design**, **data visualization**, and **accessible user interfaces** while demonstrating modern React development practices.

---

## Features

### Interactive Dataset Generation
Users can generate customizable 2D datasets by adjusting parameters such as:

- Dataset size
- Class balance
- Noise level
- Separation difficulty
- Random seed

Datasets are visualized as scatter plots and can be regenerated instantly.

---

### Model Exploration

VisualML includes multiple machine learning models, each presented on its own page with a consistent interface:

- Logistic Regression
- Perceptron
- k-Nearest Neighbors
- Decision Tree
- Small Two-Layer Neural Network

Each model page contains:

- A control panel for hyperparameters
- A dataset visualization
- A live decision boundary display
- Training and replay controls

---

### Training Visualization

Users can train models and observe how they evolve over time.

Training features include:

- Animated decision boundary updates
- Confidence region visualization
- Replayable training sequences
- Timeline scrubbing through epochs or iterations

Animations help illustrate how models adjust their parameters during training rather than instantly jumping to the final solution.

---

### Experiment Persistence

VisualML supports saving and restoring experiments directly in the browser.

- **localStorage** stores saved datasets, model selections, and presets
- **sessionStorage** preserves temporary UI state such as training position and animation progress

Users can also export and import experiment configurations.

---

### Multi-Page Interface

The application includes multiple routed pages:

- **Home** – introduction and overview
- **Playground** – interactive experimentation
- **Models** – explanations and model selection
- **Gallery** – saved experiments and presets
- **Wiki / Glossary** – expandable explanations of ML concepts
- **Settings** – accessibility and UI preferences

Navigation is handled through React Router.

---

### Accessibility

VisualML is designed to follow accessibility best practices:

- Proper heading hierarchy
- Labeled form inputs
- Keyboard navigation for controls
- WCAG-compliant color contrast
- Optional reduced-motion mode
- Non-color indicators for class labels

---

## Technology Stack

- **React**
- **React-Bootstrap**
- **React Router**
- **HTML5 Canvas / SVG visualization**
- **JavaScript**

The project is entirely client-side and requires no backend server.

---

## Deployment

VisualML is designed to be deployed on **GitHub Pages**.

Build and deploy the project using:

```bash
npm install
npm run build
