import { Blog } from "./BlogInterface";

export interface User {
    id?: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    blogs?: Array<Blog>;
}