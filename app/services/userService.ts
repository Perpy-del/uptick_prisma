import prisma from '../../prisma/index.js';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

async function register(userData: User) {
  const newUser = await prisma.user.create({
    data: {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: userData.password,
    },
  });

  return newUser;
}



export { register };
