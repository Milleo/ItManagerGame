import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { UserRegisterDTO } from "./dto/userRegister.dto";
import { UserService } from "./user.service";
import { UserUpdateDTO } from "./dto/userUpdate.dto";
import { UserUpdatePartialDTO } from "./dto/userUpdatePartial.dto";

@Controller('user')
export class UserController{
    constructor(private readonly userService: UserService){}

    @Post()
    async register(@Body() {name, email, password}: UserRegisterDTO){
        const alreadyExists = await this.userService.emailAlreadyExists(email);
        if(!alreadyExists){
            return this.userService.create({name, email, password});
        }

        throw new BadRequestException("E-mail already registered");
    }

    @Get()
    list(){
        return this.userService.findAll();
    }

    @Put()
    async update(@Body() { id, name, email, password }: UserUpdateDTO){
        const user = await this.userService.show(id);
        
        if(user.email === email){
            return this.userService.update({id, name, email, password});
        }else{
            const alreadyExists = await this.userService.emailAlreadyExists(email);
            if(!alreadyExists){
                return this.userService.update({id, name, email, password});
            }else{
                throw new BadRequestException("E-mail already registered");
            }
        }   
    }

    @Patch()
    async updatePartial(@Body() { id, name, email, password }: UserUpdatePartialDTO){
        const user = await this.userService.show(id);
        
        if(user.email === email){
            return this.userService.updatePartial({id, name, email, password});
        }else{
            const alreadyExists = await this.userService.emailAlreadyExists(email);
            if(!alreadyExists){
                return this.userService.updatePartial({id, name, email, password});
            }else{
                throw new BadRequestException("E-mail already registered");
            }
        }
    }

    @Delete()
    async delete(@Param('id') id){
        return this.userService.delete({id});
    }
}

