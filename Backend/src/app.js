import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "https://contact-management-quue.vercel.app/", // your React dev server
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// routes import
import contactRouter from "./routes/contacts.router.js";

// routes declaration
app.use("/api/v1/contacts", contactRouter);

export default app;
