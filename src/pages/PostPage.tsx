import { Link, useParams } from 'react-router-dom';
import useFetchPosts from '../hooks/useFetchPosts';
import Spinner from '../components/Spinner';
import { formatDistanceToNow } from 'date-fns';

function PostPage() {
    const { id } = useParams<{ id: string }>();
    const { data: posts, isLoading, error } = useFetchPosts();

    if (isLoading) return <Spinner />;
    if (error) return <p style={{ color: 'red' }}>{error.message}</p>;

    const post = posts?.find((p) => p.id.toString() === id);

    if (!post) return <p>Post not found.</p>;

    return (
        <div className='max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md'>
            <h1 className='text-2xl font-bold mb-4'>{post.title}</h1>
            <p className='text-gray-800 pb-6'>{post.content}</p>
            <div className='flex justify-end pt-2 pb-4'>
                <p className='text-sm text-gray-500'>Posted {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
            </div>
            <p className='text-sm text-gray-700 border-t pt-4'>
                <Link to={`/app/userposts/${post.authorId}`}>{post.authorId}</Link>
            </p>
        </div>
    );
}

export default PostPage;
