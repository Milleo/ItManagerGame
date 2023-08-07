import { PrismaService } from "../prisma/prisma.service";
import { UserRegisterDTO } from "./dto/userRegister.dto";
import { Injectable } from "@nestjs/common";
import { UserUpdateDTO } from "./dto/userUpdate.dto";
import { UserDeleteDTO } from "./dto/userDelete.dto";
import { UserUpdatePartialDTO } from "./dto/userUpdatePartial.dto";

@Injectable()
export class UserService{
  constructor(private readonly prisma: PrismaService){}

  async create({name, email, password}: UserRegisterDTO){
    return await this.prisma.user.create({
        data: { 
            name,
            email, 
            password
        }
    });
  }

  async findAll(){
    return await this.prisma.user.findMany();
  }

  async show(id){
    return await this.prisma.user.findFirst({ where: {id} });
  }

  async update({id, name, email, password}: UserUpdateDTO){
    return await this.prisma.user.update({
      data: {
        name,
        email,
        password
      }, where: { id }
    });
  };

  async updatePartial({id, ...data }: UserUpdatePartialDTO){
    return await this.prisma.user.update({
      data: {
        ...data
      }, where: { id }
    });
  }

  async delete({id}: UserDeleteDTO){
    return await this.prisma.user.delete({
      where: { id }
    });
  }

  async emailAlreadyExists(email: string){
    return await this.prisma.user.count({ where: { email }});
  }
}