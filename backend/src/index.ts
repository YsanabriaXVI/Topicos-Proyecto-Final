import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import subscriptionRoutes from "./routes/subscription.routes";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("SubTracker API running...");
});

app.use("/api/subscriptions", subscriptionRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`https://localhost:${port}`);
});
