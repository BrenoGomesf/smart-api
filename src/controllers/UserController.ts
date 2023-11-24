import express, { Request, Response } from "express";
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UserDTO, UserUpdateDto } from '../dtos/UserDTO';
import { PrismaClient } from "@prisma/client";
import { UserService } from "../services/usersService";


const router = express.Router();

const prisma = new PrismaClient();
const userService = new UserService(prisma);
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await userService.getAll();

    res.status(200).json({data: users})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro interno do servidor' }); 
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  console.log(req.params.id);
  try {
    if(!req.params.id) throw res.status(400).json({error: 'Invalido.'});
      const user = await userService.getById(Number(req.params.id));
      res.status(200).json({data:{user}})
  } catch (error) {
    res.send(error)
  }
})

router.patch("/:id", async(req: Request, res: Response) =>{
  try {
    if(!req.params.id) throw res.status(400).json({error: 'Invalido.'});

    const userData: UserDTO = plainToClass(UserUpdateDto, req.body);

    const update = await userService.update(Number(req.params.id), userData);

    res.status(200).json({data:update})
  
  } catch (error) {
    res.send(error)
  }
})

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
