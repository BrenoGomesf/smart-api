import express from "express";

import { Router, Request, Response } from "express";

const app = express();

const route = Router();

app.use(express.json());

route.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Ola mundo em ts",
  });
});

app.use(route);

app.listen(3000 || process.env.port, () => {
  "servidor rodando na porta 3000";
});
