# 🧠 AI-Assisted Fintech Credit Risk Dashboard

A responsive, component-based dashboard built with **React** and **Ant Design** for managing customer financial data, evaluating risk scores, and automating loan workflow decisions.

Designed for fintech teams to quickly visualize, assess, and act on creditworthiness data.

---

## 🚀 Tech Stack

| Layer    | Tech                                           |
| -------- | ---------------------------------------------- |
| Frontend | React, TypeScript, Ant Design, Axios, Recharts |
| Backend  | Node.js, Express, JSON (as mock DB)            |
| Styling  | Ant Design CSS                                 |
| Charts   | Recharts                                       |

---

### Figma Inspiration

- https://www.figma.com/design/sR705JH1aVVbu5Cj2KTPyb/Student-Portal-(Community)?node-id=7-861&t=2ARcwwOgBMIzqwgH-0

## 🧩 Features Overview

### 🧾 Dashboard

- Display financial **metrics** using `Card`, `Statistic`, `Grid`.
- **Line Chart**: Income vs Expenses over time.
- **Pie Chart**: Visualize customer risk distribution.
- **Customer Table**: Sortable, filterable using AntD `Table`.

### 📐 Risk Assessment

- Display credit score, debt ratio & risk score using `Card`, `Progress`.
- Credit Score – Higher score = lower risk.
- Monthly Expenses vs Income – Higher ratio = higher risk.
- Loan Repayment History – On-time payments reduce risk.
- Outstanding Loans vs Account Balance – High debt = increased risk.

  **🧮 Formula Logic**

```
riskScore =
  creditScore
  - (monthlyExpenses / monthlyIncome * 100)
  + (repaymentHistoryScore)
  - (outstandingLoans / accountBalance * 100)
```

### 🔁 Workflow Automation

- Update customer status (`Review`, `Approved`, `Rejected`).
- Form built with `Select`, `Button`, `Form` from AntD.
- Auto-alerts if risk score > 70.
- Alert popup using AntD `notification`.

### ⚠️ Alert System

- POST to `/alerts` endpoint for high-risk customers.
- Top-right popup alerts via AntD notifications.

### Project Structure

```
/frontend
└── pages/
  ├── Dashboard.tsx
  ├── RiskAssessment.tsx
  ├── Workflow.tsx
  └── NotFound.tsx
└── services/
  └── customerService.ts
└── utils/
  └── riskScore.ts
└── types/
  └── commonTypes.types.ts
```

### 📱 Mobile Responsiveness

- Card layout automatically stacks on smaller screens.
- Grid spacing adjusts with AntD's gutter and responsive breakpoints (xs, sm, md, lg).
- Tables and forms adapt to fit mobile widths without breaking layout.
- Button and Select components stay usable and tapable on touch devices.

### Getting Started

cd frontend
npm install
npm start

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
