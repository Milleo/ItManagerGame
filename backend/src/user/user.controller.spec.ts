import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

describe("UserController", () => {
    let userController: UserController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
          controllers: [UserController]
        }).compile();
    
        userController = app.get<UserController>(UserController);
      });
    
    it("test", () => {
        expect(userController.register({
            name: "Test username",
            email: "user@email.com",
            password: "asdf"
        })).toBe("OK");
    })
    
})