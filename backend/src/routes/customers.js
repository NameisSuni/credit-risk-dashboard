const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const router = express.Router();

const dataPath = path.join(__dirname, "../db/customers.json");

// GET all customers
router.get("/", async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const customers = JSON.parse(data);
    res.json(customers);
  } catch (error) {
    console.error("Error reading customer data:", error);
    res.status(500).json({ error: "Failed to load customer data" });
  }
});

// PUT: update customer status
router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const customers = JSON.parse(data);

    const index = customers.findIndex((c) => c.customerId === id);
    if (index === -1) {
      return res.status(404).json({ error: "Customer not found" });
    }

    customers[index].status = status;

    await fs.writeFile(dataPath, JSON.stringify(customers, null, 2), "utf-8");
    res.json({ success: true, updated: customers[index] });
  } catch (error) {
    console.error("Error updating customer status:", error);
    res.status(500).json({ error: "Failed to update customer status" });
  }
});

router.post("/alerts", (req, res) => {
  try {
    console.log("🚨 Simulated Alert Received:", req.body);
    res.status(200).json({ message: "Alert logged" });
  } catch (error) {
    console.error("Alert error:", error);
    res.status(500).json({ error: "Failed to process alert" });
  }
});

module.exports = router;
