import prisma from "../../prisma";
import { Blog } from "../interfaces/BlogInterface";

async function show(identifier: string): Promise<Array<any>> {
    const blogs = await prisma.blog.findMany({})

    return blogs;
}

export { show }