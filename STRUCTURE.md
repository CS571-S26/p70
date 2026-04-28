# Website Structure Overview (User Perspective)

## Global Navigation (Visible on All Pages)
The site uses a shared page layout with a consistent top navigation bar.

Navbar links:
- Home
- Explore
- Visualizer
- Settings
- About

Navigation behavior:
- The current page is shown with an active state in the navbar.
- Navigation is keyboard accessible.

---

## Routes

| Route | User-Facing Page | Purpose |
|---|---|---|
| `/` | Home | Introduction and entry points |
| `/explore` | Explore | Browse concepts |
| `/explore/:id` | Concept Detail | Read model-specific explanations |
| `/visualizer` | Visualizer | Interactive model and dataset exploration |
| `/settings` | Settings | Preferences and accessibility options |
| `/about` | About | Project purpose, features, and course context |
| `*` | Fallback redirect | Redirects unknown routes to Home |

Notes:
- Routing is client-side.
- The app uses hash-based routing for GitHub Pages compatibility.

---

## 1. Home Page

### What Users See
- A hero introduction to VisualML.
- A short project overview explaining interactive ML learning.
- Clear call-to-action buttons to:
  - Open Visualizer
  - Go to Explore
- Summary cards highlighting what users can do (model comparison, noise effects, explanation panel guidance).

---

## 2. Explore Page

### What Users Can Do
- Browse concept cards for implemented topics.
- Filter cards by category:
  - Machine Learning
  - Mathematics
  - Algorithms
- See concept metadata on each card:
  - Difficulty label
  - Category label
  - Preview image
  - Short description
- Open concept details through the Learn More action.

---

## 3. Concept Detail Pages (`/explore/:id`)

Implemented concept detail pages:
- Logistic Regression
- k-Nearest Neighbors (kNN)
- Principal Component Analysis (PCA)

Each concept detail page includes:
- Overview and explanation sections
- Visual/image example
- Source attribution for external reference images
- A direct button to open the selected concept in the Visualizer

---

## 4. Visualizer Page (Core Interactive Page)

### What Users Can Control
- Model selector (Logistic Regression, kNN, PCA)
- Dataset parameters:
  - Dataset size
  - Noise
  - Random seed
- Model-specific controls:
  - Logistic Regression: decision boundary toggle
  - kNN: k value, distance metric, neighbor/confidence toggles
  - PCA: projection angle and projection/axis toggles

### What Users See
- A live visualization area that updates when controls change
- Reset controls action
- Randomize query point action (kNN)
- A model explanation/summary panel with current state details
- Text summary support so the visualization is interpretable without relying only on color

---

## 5. Settings Page

### Available Preferences
- Appearance:
  - Light / Dark theme
- Accessibility:
  - High contrast mode
  - Reduced motion mode
- Visualizer defaults:
  - Default model
  - Default dataset size
  - Default noise
- Reset to defaults action

Persistence:
- Settings are saved in `localStorage`.

---

## 6. About Page

### Content
- Project purpose and motivation
- Key features and interaction highlights
- How to use the site at a high level
- Course context and project scope

---

## 7. Footer (Global)

The footer is visible across pages and includes:
- Quick links:
  - Home
  - Explore
  - Visualizer
- Project identity text
- Accessibility note (points users to Settings)

---

## Example User Flow

1. User lands on Home.
2. User opens Explore.
3. User selects a concept card.
4. User reads the Concept Detail page.
5. User opens that concept in the Visualizer.
6. User adjusts parameters and observes live updates.
7. User updates preferences in Settings.
8. User visits About for project context.

Flow summary:
Home → Explore → Concept Detail → Visualizer → Settings/About

---

## Final Requirement Notes

This final version of VisualML satisfies core CS571 expectations by providing:
- At least 3 fully developed pages (Home, Explore, Visualizer, plus Settings/About)
- At least 14 meaningful React components
- Meaningful user interactivity in the Visualizer
- Accessibility support (labels, keyboard navigation, focus visibility, text alternatives)
- Consistent React-Bootstrap UI patterns
- GitHub Pages-compatible client-side routing and deployment
