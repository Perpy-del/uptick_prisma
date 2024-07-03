import bcrypt from 'bcrypt';

async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const passwordHash = bcrypt.hash(
        password,
        Number(process.env.BCRYPT_SALT_ROUNDS)
      );
      resolve(passwordHash);
    } catch (error) {
      reject(error);
    }
  });
}

async function compareHash(
  password: string,
  passwordHash: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      const isPasswordCorrect = bcrypt.compare(password, passwordHash);
      resolve(isPasswordCorrect);
    } catch (error) {
      reject(error);
    }
  });
}

export { hashPassword, compareHash };
