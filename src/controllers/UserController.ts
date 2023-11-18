import express, { Request, Response } from "express";
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UserDTO } from '../dtos/UserDTO';
import { PrismaClient } from "@prisma/client";
import { UserService } from "../services/usersService";
const router = express.Router();

const prisma = new PrismaClient();
const userService = new UserService(prisma);
router.get("/", (req: Request, res: Response) => {
  res.json({ user: "achou a rota" });
});

router.post("", async (req: Request, res: Response) => {
  
  const userData: UserDTO = plainToClass(UserDTO, req.body);

  try {
     const errors = await validate(userData);
    
     if (errors.length > 0) {
      res.status(400).json({ errors: errors.map((error: any) => Object.values(error.constraints)) });
      }

    const response  = await userService.create(userData);

    res.status(201).json(response);

  } catch (error: any) {
    if(error.status == 406) res.status(403).json({error: 'Usuário já cadastrado.'});
    else{
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
});
export default router;
