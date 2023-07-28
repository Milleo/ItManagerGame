export const fakeUsers = [
  {
    id: "01c2f052-878b-40fe-9079-66d09430c978",
    name: 'User name 01',
    email: 'user01@email.com',
    password: "Pas$w0rd", 
  },
  {
    id: "94d5162f-e71f-4509-87b9-f0eecfcd2cd2",
    name: 'User name 02',
    email: 'user02@email.com',
    password: "Pas$w0rd",
  },
  {
    id: "5504f079-f9ff-467c-8c54-966bd03d7fc5",
    name: 'User name 03',
    email: 'user03@email.com',
    password: "Pas$w0rd",
  },
];

export const prismaMock = {
  user: {
    create: jest.fn().mockImplementation((data) => {
      return Promise.resolve(data);
    }),
    findMany: jest.fn().mockResolvedValue(fakeUsers),
    findUnique: jest.fn().mockResolvedValue(fakeUsers[1]),
    findFirst: jest.fn().mockImplementation((stmt) => {
      return fakeUsers.find((obj) => obj.id === stmt.where.id)
    }),
    update: jest.fn().mockImplementation(({ data }) => data),
    delete: jest.fn(),
    count: jest.fn().mockImplementation((stmt) => {
      const filtered = fakeUsers.filter((obj) => obj.email === stmt.where.email)

      return Promise.resolve(filtered.length)
    })
  },
};