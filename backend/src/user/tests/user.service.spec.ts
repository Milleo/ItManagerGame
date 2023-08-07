import { PrismaService } from "../../prisma/prisma.service";
import { UserService } from "../user.service";
import { Test, TestingModule } from "@nestjs/testing";
import { fakeUsers, prismaMock } from "./mocks/user.mocks";

describe("UserService", () => {
  let service: UserService
  let prisma: PrismaService
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaMock }
      ]
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => jest.clearAllMocks());
    
  it("List all users", async () => {
    const response = await service.findAll();

    expect(response).toEqual(fakeUsers);
    expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.user.findMany).toHaveBeenCalledWith();
  });

  it("E-mail already exists", async () => {
    const response = await service.emailAlreadyExists(fakeUsers[0].email);
    
    expect(response).toEqual(1);
    expect(prisma.user.count).toHaveBeenCalledTimes(1);
    expect(prisma.user.count).toHaveBeenCalledWith({ where: { email: fakeUsers[0].email }});
  });

  it("E-mail dosen't exists", async () => {
    const newEmail = "emailaddressunique@email.com";
    const response = await service.emailAlreadyExists(newEmail);

    expect(response).toEqual(0);
    expect(prisma.user.count).toHaveBeenCalledTimes(1);
    expect(prisma.user.count).toHaveBeenCalledWith({ where: { email: newEmail }});
  });

  it("Find user by Id", async () => {
    const response = await service.show(fakeUsers[1].id);

    expect(response).toEqual(fakeUsers[1]);
    expect(prisma.user.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.user.findFirst).toHaveBeenCalledWith({ where: { id: fakeUsers[1].id }});
  });

  it("Create user", async () => {
    const newUser = {...fakeUsers[0]};
    delete newUser.id;
    const response = await service.create(newUser);

    expect(response).toEqual({ data: newUser });
    expect(prisma.user.create).toHaveBeenCalledTimes(1);
    expect(prisma.user.create).toHaveBeenCalledWith({ data: newUser });
  });

  it("Update user", async () => {
    const updatedUser = {
      name: 'User name NEW',
      email: 'userNEW@email.com',
      password: "Pas$w0rdCHANGED"
    }
    const userId = fakeUsers[0].id;
    
    const response = await service.update({ id: userId, ...updatedUser });

    expect(response).toEqual(updatedUser);
    expect(prisma.user.update).toHaveBeenCalledTimes(1);
    expect(prisma.user.update).toHaveBeenCalledWith({ data: updatedUser ,  where: { id: userId }});
  });

  it("Update user name", async () => {
    const updateUser = {
      id: fakeUsers[0].id,
      name: 'User name ONLY UPDATED'
    }
    
    const response = await service.updatePartial(updateUser);

    expect(expect.objectContaining(response)).toEqual(updateUser);
    expect(prisma.user.update).toHaveBeenCalledTimes(1);
    expect(prisma.user.update).toHaveBeenCalledWith({ data: { name: updateUser.name } ,  where: { id: updateUser.id }});
  });

  it("Update user email", async () => {
    const updateUser = {
      id: fakeUsers[0].id,
      email: 'userNEW@email.com'
    }
    
    const response = await service.updatePartial(updateUser);

    expect(expect.objectContaining(response)).toEqual(updateUser);
    expect(prisma.user.update).toHaveBeenCalledTimes(1);
    expect(prisma.user.update).toHaveBeenCalledWith({ data: { email: updateUser.email } ,  where: { id: updateUser.id }});
  });

  it("Update user password", async () => {
    const updateUser = {
      id: fakeUsers[0].id,
      password: 'Pas$w0rdCHANGED'
    }
    
    const response = await service.updatePartial(updateUser);

    expect(expect.objectContaining(response)).toEqual(updateUser);
    expect(prisma.user.update).toHaveBeenCalledTimes(1);
    expect(prisma.user.update).toHaveBeenCalledWith({ data: { password: updateUser.password } ,  where: { id: updateUser.id }});
  });

  it("Delete user", async () => {
    const response = await service.delete({ id: fakeUsers[0].id })

    expect(response).toEqual(undefined);
    expect(prisma.user.delete).toHaveBeenCalledTimes(1);
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: fakeUsers[0].id }});
  });


})