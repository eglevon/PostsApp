import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import type { Post } from '../types/Post';

const fetchUserPosts = async (authorId: string): Promise<Post[]> => {
    const { data } = await api.get<Post[]>(`/posts/user/${authorId}`);
    return data;
};

export function useUserPosts(authorId: string) {
    return useQuery<Post[], Error>({
        queryKey: ['posts', authorId],
        queryFn: async () => {
            return fetchUserPosts(authorId);
        },
        enabled: !!authorId,
    });
}

export default useUserPosts;
