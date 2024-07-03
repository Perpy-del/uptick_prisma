export interface Blog {
    id?: string;
    title: string;
    slug: string;
    body: string;
    isFeatured: boolean;
    category: string | null;
    thumbnail: string | null;
    createdAt: Date;
    updatedAt: Date;
    authorId?: string 
  }