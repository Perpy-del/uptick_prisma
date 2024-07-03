import prisma from '../../prisma/index.js';
import { BadUserRequestError } from '../errors/BadUserRequestError.js';
import { hashPassword, compareHash } from '../utilities/hash.js';
import { User } from '../interfaces/UserInterface.js';

async function register(userData: User) {
  const existingUser: User | null = await prisma.user.findUnique({ where: { email: userData.email} });

  if (existingUser) {
    throw new BadUserRequestError("User already exists. Log in")
  }

  const passwordHash: string = await hashPassword(userData.password)

  const newUser: User = await prisma.user.create({
    data: {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: passwordHash,
    },
  });

  return newUser;
}

export { register };
