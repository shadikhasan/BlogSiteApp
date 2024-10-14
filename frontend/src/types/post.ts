// src/types/post.ts
export interface Post {
    id: number;
    author_id: number;
    author_username: string;
    title: string;
    content: string;
    date_posted: string;
    thumbnail: string;
    views: number;
    author: number;
    category: number;
    category_name: string;
}
