import { IsUUID } from "class-validator";
import { UserRegisterDTO } from "./userRegister.dto";

export class UserUpdateDTO extends UserRegisterDTO{
  @IsUUID()
  id: string
}