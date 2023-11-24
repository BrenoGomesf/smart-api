import { PrismaClient } from '@prisma/client';
import { UserService } from '../../src/services/usersService';
import {} from '../../node_modules/jest/'
const prisma = new PrismaClient();

describe('UserService Array', () => {
    test('should return user data', async () => {
      const userService = new UserService(prisma);
  
      // Utilize o matcher `.resolves` para verificar se a Promise é resolvida
      await expect(userService.getAll()).resolves.toEqual(expect.arrayContaining([]));
    });
  });
