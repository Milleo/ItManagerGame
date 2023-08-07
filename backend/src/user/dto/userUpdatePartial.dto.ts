import { IsEmail, IsString, IsStrongPassword, IsUUID } from "class-validator";
import { UserRegisterDTO } from "./userRegister.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UserUpdatePartialDTO extends PartialType(UserRegisterDTO){
  @IsUUID()
  id: string
}