// src/services/api.ts
import axios from 'axios';
import { Post } from '../types/post';

const API_URL = 'http://127.0.0.1:8000/api/posts/';

export const fetchPosts = async (): Promise<Post[]> => {
    const response = await axios.get<Post[]>(API_URL);
    return response.data;
};

export const fetchPostById = async (id: number): Promise<Post> => {
    const response = await axios.get<Post>(`${API_URL}${id}/`);
    return response.data;
};
