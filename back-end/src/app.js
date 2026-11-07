const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRouter = require("./routes/auth.routes");
const menuRouter = require("./routes/menu.routes");
const ordersRouter = require("./routes/orders.routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: corsOrigin === "*" ? true : corsOrigin.split(",") }));
app.use(express.json());
app.use(morgan("dev"));

// Health check — useful to confirm the API is deployed and reachable
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is up and running." });
});

app.use("/api/auth", authRouter);
app.use("/api/menu", menuRouter);
app.use("/api/orders", ordersRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
