import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import type { Post } from '../types/Post';

const fetchPosts = async (): Promise<Post[]> => {
    const { data } = await api.get<Post[]>('/posts');
    return data;
};

function useFetchPosts() {
    return useQuery<Post[], Error>({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });
}

export default useFetchPosts;
