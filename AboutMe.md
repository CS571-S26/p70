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

VisualML includes multiple machine learning models. Models are introduced through concept pages and explored interactively. 

Users can:
- learn concepts in the Explore section
- read detailed explanations
- open the Visualizer to experiment with the model

The Visualizer provides:

- A control panel for hyperparameters
- A dataset visualization
- A live decision boundary display
- Training and replay controls

Examples include:

- Logistic Regression
- Perceptron
- k-Nearest Neighbors
- Decision Tree
- Small Two-Layer Neural Network

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

The application is structured as a multi-page experience:

- **Home** – introduction and overview
- **Explore** – browse concepts and topics
- **Concept Detail** – learn a specific concept
- **Visualizer** – interactive experimentation
- **Settings** – accessibility and preferences
- **About** – project description

Users follow a guided learning flow:

Explore → Concept Detail → Visualizer

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

### Optional Features

Some features may be added later if time allows:

- saving and loading experiments
- extended concept explanations
- additional visualization modes

These are not required for the core experience.

---

## Technology Stack

- **React**
- **React-Bootstrap**
- **React Router**
- **HTML5 Canvas / SVG visualization**
- **JavaScript**

The project is entirely client-side and requires no backend server.

### Import Style Convention

Always use named imports from `react-bootstrap`, for example:
```js
import { Button, Container, Navbar } from "react-bootstrap";
```

Do not use per-component imports such as:
```js
import Button from "react-bootstrap/Button";
```

All React-Bootstrap components must be imported using the named import style for consistency.

---

## Deployment

VisualML is designed to be deployed on **GitHub Pages**.

Build and deploy the project using:

```bash
npm install # once
npm run dev # developer
npm run build
npm run deploy