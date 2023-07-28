import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { fakeUsers, prismaMock } from "./mocks/user.mocks";
import { BadRequestException } from '@nestjs/common';
import { UserUpdateDTO } from '../dto/userUpdate.dto';

describe("UserController", () => {
    let userController: UserController;
    let prisma: PrismaService;
    let user: UserUpdateDTO;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          controllers: [UserController],
          providers: [
            UserService,
            { provide: PrismaService, useValue: prismaMock }
          ]
        }).compile();
    
        user = {...fakeUsers[0]};
        userController = module.get<UserController>(UserController);
        prisma = module.get<PrismaService>(PrismaService);
      });
    
    it("Register new user", async () => {
      const newUser = {
        name: "New user",
        email: "newuser@email.com",
        password: "Pas$w0rd"
      }
      
      const result = await userController.register(newUser);
      expect(result).toEqual(expect.objectContaining({ data: newUser }));
    });

    it("Try to register existing user", async () => {
      expect(userController.register(fakeUsers[0])).rejects.toEqual(new BadRequestException("E-mail already registered"));
    });

    it("Update user name", async () => {
      user.name = "User name 01 - UPDATED";

      const result = await userController.update(user);
      expect(user).toEqual(expect.objectContaining(result));
    });

    it("Update password", async () => {
      user.password = "NEW_Pas$w0rd";

      const result = await userController.update(user);
      expect(user).toEqual(expect.objectContaining(result));
    });

    it("Update e-mail", async () => {
      user.email = "nonexistingemail@email.com";

      const result = await userController.update(user);
      expect(user).toEqual(expect.objectContaining(result));
    });

    it("Update to existing e-mail", async () => {
      user.email = "user02@email.com";

      expect(userController.update(user)).rejects.toEqual(new BadRequestException("E-mail already registered"));
    });
    
})