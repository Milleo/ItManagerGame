import { Body, Controller, Post } from "@nestjs/common";
import { UserRegisterDTO } from "./dto/userRegister.dto";

@Controller('user')
export class UserController{
    @Post('register')
    register(@Body() {name, email, password}: UserRegisterDTO){
        return { name, email, password }
    }
}

