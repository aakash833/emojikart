export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedDate: string;
  readTime: number;
  category: string;
  tags: string[];
  featured: boolean;
  image?: string;
}
