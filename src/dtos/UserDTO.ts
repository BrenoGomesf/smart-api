import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty({ message: 'O campo e-mail não pode estar vazio' })
  @IsEmail({}, { message: 'O e-mail fornecido não é válido' })
  email: string;
}
