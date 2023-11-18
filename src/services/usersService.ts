import { PrismaClient } from '@prisma/client';
import { User } from 'model/user.model';

export class UserService {
  constructor(private prisma: PrismaClient) {}

    create(userData: User):Promise<User | any> {
    return new Promise(async (resolve, reject) => {
        try {
            const isExist = await this.isExist(userData);
            
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
  async isExist(user: User){
      const isExist = await this.prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });
        return isExist
  }
}