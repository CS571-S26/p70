# VisualML

VisualML is an interactive, client-side web application designed to help users understand how common machine learning algorithms behave through visualization and experimentation. Instead of learning models only through equations or static diagrams, VisualML lets users generate 2D datasets, switch models, and observe how outputs change as parameters are adjusted.

The application is built with **React**, **React Router**, and **React-Bootstrap**, and runs fully in the browser. It is deployed on **GitHub Pages** with no backend infrastructure. All dataset generation and visual interaction are client-side.

---

## Final Project Status

- Deployed on GitHub Pages
- Fully client-side React application (no backend)
- Built with React, React Router, and React-Bootstrap
- Multi-page routed site with shared navigation and layout

---

## Project Goals

Machine learning concepts such as decision boundaries and neighborhood-based classification are often difficult to understand from textbooks alone. VisualML aims to make these concepts more intuitive by:

- Providing **interactive visualizations of model behavior**
- Allowing users to **generate and manipulate datasets**
- Connecting concept explanations directly to hands-on controls

The project emphasizes **interactive UI design**, **data visualization**, and **accessible user interfaces** while demonstrating modern React development practices.

---

## Features

### Interactive Visualizer

The Visualizer is the core interactive page and supports:

- Model selection (Logistic Regression, k-Nearest Neighbors, PCA)
- Dataset controls (size, noise, seed)
- Model-specific controls (for example k value, distance metric, projection angle)
- Reset controls and randomize actions
- Live visual updates as controls change

---

### Explore-to-Visualizer Learning Flow

Users can follow a guided path:

- Explore concepts on `/explore`
- Open a concept detail page on `/explore/:id`
- Continue directly into `/visualizer` with model context

Concept detail pages include model explanations, visual examples, and attribution links for referenced images.

---

### Explanation and Persistence

- An explanation panel summarizes model-specific behavior and current settings.
- Settings are persisted with **localStorage** (theme, accessibility preferences, and default Visualizer values).

---

### Multi-Page Navigation

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

## Architecture Overview

- The project includes at least **14 meaningful React components**.
- Reusable components include:
  - `AppNavbar`
  - `AppFooter`
  - `PageLayout`
  - `ConceptCard`
  - `VisualizationCanvas`
  - `ParameterControls`
  - `ExplanationPanel`
  - `SettingsPanel`
- React Router routes:
  - `/`
  - `/explore`
  - `/explore/:id`
  - `/visualizer`
  - `/settings`
  - `/about`

---

## Interactivity

- The Visualizer is meaningfully interactive, not static.
- Users can modify dataset parameters and model behavior through controls.
- Reset and randomize actions are included.
- Visualization output updates in real time when parameters change.

---

## Accessibility

VisualML implements core accessibility requirements:

- No skipped page heading levels
- All content images include alt text
- Inputs are properly labeled
- Keyboard navigation is supported for navbar and controls
- Visible focus states are present
- Color contrast is designed to meet WCAG AA targets
- Visualizations include text summaries/labels so interpretation does not rely only on color

---

## Design and UI

- React-Bootstrap is used consistently across pages and components.
- Layout is responsive through Bootstrap grid and utility classes.
- Navigation and CTAs maintain a clear visual hierarchy.
- A reusable `PageLayout` keeps structure consistent across routes.

---

## Technology Stack

- **React**
- **React-Bootstrap**
- **React Router**
- **SVG-based visualization**
- **JavaScript**
- **Vite**

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

VisualML is deployed via **GitHub Pages** and built with **Vite**.

The app runs fully in the browser and does not require a backend server.

Build and deploy the project using:

```bash
npm install # once
npm run dev # local development
npm run build
npm run deploy
```
