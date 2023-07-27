import { Controller, Get } from "@nestjs/common";

@Controller('user')
export class UserController{
    @Get('register')
    register(): string {
        return "OK"
    }
}

