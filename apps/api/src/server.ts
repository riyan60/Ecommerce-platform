
import "dotenv/config";
import express from "express";

import routes from "./routes";

const app = express();

// Razorpay webhook needs the original raw request body
app.use(
  "/api/payments/webhook",
  express.raw({ type: "application/json" })
);

// Parse JSON for all other API routes
app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
