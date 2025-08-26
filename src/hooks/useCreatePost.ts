import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import api from '../lib/axios';
import type { Post } from '../types/Post';

export type CreatePostData = {
    title: string;
    content: string;
};

export function useCreatePost(): UseMutationResult<Post, AxiosError, CreatePostData> {
    const queryClient = useQueryClient();

    return useMutation<Post, AxiosError, CreatePostData>({
        mutationFn: async (newPost: CreatePostData) => {
            const { data } = await api.post<Post>('/posts', newPost);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
}
