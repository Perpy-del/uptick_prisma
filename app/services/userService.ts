import prisma from '../../prisma/index.js';
import { BadUserRequestError } from '../errors/BadUserRequestError.js';
import { hashPassword, compareHash } from '../utilities/hash.js';
import { User } from '../interfaces/UserInterface.js';
import { generateToken } from '../http/middlewares/authMiddleware.js';

async function register(userData: User) {
  const existingUser: User | null = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (existingUser) {
    throw new BadUserRequestError('User already exists. Log in');
  }

  const passwordHash: string = await hashPassword(userData.password);

  const newUser: User = await prisma.user.create({
    data: {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: passwordHash,
    },
  });

  const data = {
    id: newUser.id,
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    createdAt: newUser.createdAt,
    updatedAt: newUser.updatedAt,
  };

  return data;
}

async function login(userData: User) {
  const existingUser: User | null = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (!existingUser) {
    throw new BadUserRequestError('User credentials are not in our records');
  }

  const isPasswordCorrect: boolean = await compareHash(
    userData.password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    throw new BadUserRequestError('User credentials are not in our records');
  }

  const tokenData = {
    email: existingUser.email,
    id: existingUser.id,
  };

  const { token, expiryTime } = generateToken(tokenData);

  const { id, email, firstName, lastName, createdAt, updatedAt, blogs } =
    existingUser;

  const data = {
    userId: id,
    email: email,
    firstName: firstName,
    lastName: lastName,
    createdAt: createdAt,
    updatedAt: updatedAt,
    blogs: blogs,
    token: token,
    tokenExpiresAt: expiryTime,
  };

  return data;
}

async function update(userData: any, identifier: string) {
  const existingUser = await prisma.user.findUnique({ where: { id: identifier }})

  if (!existingUser) {
    throw new BadUserRequestError("User not found")
  }

  const updatedUser = await prisma.user.update({
    where: { id: identifier },
    data: {
      ...userData,
    },
  });

  return updatedUser;
}

export { register, login, update };
