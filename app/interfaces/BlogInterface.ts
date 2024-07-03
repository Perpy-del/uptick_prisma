export interface Blog {
    id?: string;
    title: string;
    slug: string;
    author: string;
    body: string;
    isFeatured: boolean;
    category: string;
    createdAt?: Date;
    updatedAt?: Date;
    authorId: string 
  }