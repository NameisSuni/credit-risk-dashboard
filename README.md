# 🧠 AI-Assisted Fintech Credit Risk Dashboard Frontend

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
npm run dev


# 🏦 Fintech Credit Risk Backend API

- This is the Node.js + Express.js backend for the Fintech Credit Risk Dashboard, built to support customer data operations, risk analysis, status updates, and alert simulation.

### ⚙️ Tech Stack

- Node.js.
- Express.js.
- CORS – For frontend-backend integration.
- Nodemon – For local development.
- Axios – For frontend consumption.
- JSON file – Mock persistent storage.

### 📁 Folder Structure

```
backend/
├── controllers/
│   └── customerController.js
├── routes/
│   └── customerRoutes.js
├── services/
│   └── fileService.js
├── data/
│   └── customers.json
├── server.js
└── README.md
```

### 🚀 Getting Started

cd backend
npm install
npm run dev

### 💡 Features

**✅ Status Update Workflow** - Accepts status updates via API. - Persists updates to the customers.json file. - Built with async/await + error handling.

**🔔 Risk-Based Alert System** - When a customer with risk score > 70 is marked Approved or Review, a POST is triggered to /alerts. - Frontend shows notification; backend logs alert.

**🧪 Mock Database (JSON)** - All customer data is stored in /data/customers.json. - Easily replaceable with MongoDB, PostgreSQL, etc. for production.

### 👨‍💻 Author

- Built with ❤️ by Sunilkumar Namala — powered by Node.js, Ant Design, React, and a touch of AI.

