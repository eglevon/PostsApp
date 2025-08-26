import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import type { Post } from '../types/Post';

const fetchPost = async (id: string): Promise<Post> => {
    const { data } = await api.get<Post>(`/posts/${id}`);
    return data;
};

function usePostById(id: string) {
    return useQuery<Post, Error>({
        queryKey: ['posts', id],
        queryFn: async () => {
            return fetchPost(id);
        },
    });
}

export default usePostById;
