import prisma from '../../config/database.config.js';

const authRepository = {
  getUserByEmail: (email) => {
    return prisma.user.findUnique({
      where: { email: email },
    });
  },

  createUser: (data) => {
    return prisma.user.create({
      data: {
        email: data.email,
        passwordHash: data.hashedPassword,
        name: data.name,
      },
    });
  },
};

export default authRepository;
