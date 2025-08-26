import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCreatePost } from '../hooks/useCreatePost';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FormData = {
    title: string;
    content: string;
};

function CreatePost() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const { mutate, isPending } = useCreatePost();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        mutate(data, {
            onSuccess: (post) => {
                toast.success(`Post "${post.title}" created successfully!`);
                reset();
                navigate('/app/myposts');
            },
            onError: (error: unknown) => {
                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data?.message || error.message);
                } else if (error instanceof Error) {
                    toast.error(error.message);
                } else {
                    toast.error('Failed to create post');
                }
            },
        });
    };

    return (
        <div className='p-12'>
            <h2 className='text-2xl font-bold text-center mb-6'>Create a Post</h2>

            <form onSubmit={handleSubmit(onSubmit)} className='max-w-md mx-auto p-6 bg-white shadow-md rounded-lg'>
                <div className='mb-4'>
                    <label className='block mb-2 font-semibold'>Title</label>
                    <input type='text' {...register('title', { required: 'Title is required' })} className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300' />
                    {errors.title && <p className='text-red-500 text-sm mt-1'>{errors.title.message}</p>}
                </div>

                <div className='mb-4'>
                    <label className='block mb-2 font-semibold'>Content</label>
                    <textarea {...register('content', { required: 'Content is required' })} className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300' rows={5} />
                    {errors.content && <p className='text-red-500 text-sm mt-1'>{errors.content.message}</p>}
                </div>

                <button type='submit' className='w-full bg-purple-600  text-white py-2 px-4 rounded-md hover:bg-purple-950 transition disabled:opacity-50 disabled:cursor-not-allowed' disabled={isPending}>
                    {isPending ? 'Creating...' : 'Create a Post'}
                </button>
            </form>
        </div>
    );
}

export default CreatePost;
