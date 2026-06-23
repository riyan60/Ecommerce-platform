import dotenv from "dotenv";
import express from "express";

import routes from "./routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});