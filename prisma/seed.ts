import { PrismaClient } from '@prisma/client';
import { data } from '../storage/blogDB.js';

const prisma = new PrismaClient()

async function main() {
  const seedBlogs = await prisma.blog.createMany({
    data: data
  })
  console.log(seedBlogs)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })