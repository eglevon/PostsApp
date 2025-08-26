import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import type { Post } from '../types/Post';
import { useAuthStore } from '../store/useAuthStore';

const fetchMyPosts = async (authorId: string): Promise<Post[]> => {
    const { data } = await api.get<Post[]>(`/posts/user/${authorId}`);
    return data;
};

export function useMyPosts() {
    const user = useAuthStore((state) => state.user);

    return useQuery<Post[], Error>({
        queryKey: ['myPosts', user?.id],
        queryFn: async () => {
            if (!user?.id) throw new Error('User ID is required');
            return fetchMyPosts(user.id);
        },
        enabled: !!user?.id,
    });
}
