import { PrismaClient } from '@prisma/client';
import { User } from 'model/user.model';

export class UserService {
  constructor(
    private prisma: PrismaClient
    ) {}

  create(userData: User):Promise<User | any> {
    return new Promise(async (resolve, reject) => {
        try {
            const isExist = await this.isExistEmail(userData);
            
              if (!isExist) {
                const user = await this.prisma.user.create({
                  data: {
                    email: userData.email,
                    name: userData.name,
                  },
                });
                resolve(user)
            }
            else {
                reject({status: 406, message:'Usuário já cadastrado.'})
              }
        } catch (error:any) {
            throw new Error(error)
        }
    })
  }
  public getById(id: number): Promise<User>{
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.isExistId(id)
        resolve(user as User);
      } catch (error:any) {
        reject(error);
        throw new Error(error)
      } 
    });
  }
  public update(id: number, body: User):Promise<User>{
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.getById(id);

        if(!user)reject("");
  
        const update = await this.prisma.user.update({
          where:{
            id: id
          },
          data:{
            name: body.name,
          }
        })
        resolve(update as User); 
      } catch (error) {
        reject(error)
      }
    })
  }
  public async isExistEmail(user: User){
      const isExist = await this.prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });
        return isExist
  }
  public async isExistId(id: number){
    const isExist = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return isExist
  }
  public getAll():Promise<User[] | any> {
      return new Promise(async (resolve, reject) => {
          try {
            const users = await this.prisma.user.findMany({
              orderBy: {
                id : 'desc'
              }
            });
      
            if(users.length <= 0) reject([]);
            resolve(users);
          } catch (error) {
            reject(error)
          }
      })
  }
}