import dotenv from "dotenv";

dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import { TypeRouter } from "./routers/TypeRouter.js";
import { ExperienceRouter } from "./routers/ExperienceRouter.js";
import * as path from "path";

const app = express();
app.use(bodyParser.json());

app.use("/api/type", TypeRouter);
app.use("/api/experience", ExperienceRouter);

app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT, () => {
  console.info(`Server running on http://localhost:${server.address().port}`);
});
