import express, { NextFunction } from "express";
import { Router, Request, Response } from "express";
import UserController from "../src/controllers/UserController";
import { PrismaClient } from '@prisma/client'

var  cors  = require ('cors') 
const app = express();
const prisma = new PrismaClient()

app.use(cors())

app.use(express.json());

const route = Router();


app.use(route);

app.use("/users", UserController);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World");
})
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(error.message);
})

app.listen(3000 || process.env.PORT, () => {
  "servidor rodando na porta 3000";
});
