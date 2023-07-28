import { IsUUID } from "class-validator";

export class UserDeleteDTO{
  @IsUUID()
  id: string
}