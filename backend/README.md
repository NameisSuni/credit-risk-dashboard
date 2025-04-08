### 🏦 Fintech Credit Risk Backend API

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
