import { Link, useNavigate } from 'react-router-dom';
import type { Post } from '../types/Post';
import { useAuthStore } from '../store/useAuthStore';
import Spinner from './Spinner';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

type PostsListProps = {
    posts: Post[];
    loading?: boolean;
    error?: string | null;
};

export function PostsList({ posts, loading, error }: PostsListProps) {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const filteredPosts = posts.filter((post) => {
        const q = query.toLowerCase();
        return post.title.toLowerCase().includes(q) || post.content.toLowerCase().includes(q);
    });

    if (loading) return <Spinner />;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (posts.length === 0)
        return (
            <div className='flex flex-col items-center pt-10'>
                <p className='text-xl text-gray-600 mb-6'>No posts found.</p>
                <Link to='/app/create' className='px-6 py-2 bg-purple-600  text-white rounded-lg hover:bg-purple-950 transition'>
                    Create a new post.
                </Link>
            </div>
        );

    return (
        <div className='min-h-screen flex flex-col gap-8'>
            <div className='flex justify-center pt-6'>
                <input type='text' placeholder='Search posts...' value={query} onChange={(e) => setQuery(e.target.value)} className='w-70 justify-self-center rounded-xl border border-gray-300 bg-white p-2 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-300' />
            </div>

            <ul className='flex flex-col gap-4 p-6'>
                {filteredPosts.length > 0 ? (
                    filteredPosts
                        .slice()
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .map((post) => (
                            <li
                                key={post.id}
                                onClick={() => {
                                    if (user) {
                                        navigate(`/app/posts/${post.id}`);
                                    } else {
                                        navigate('/signin');
                                    }
                                }}
                                className='cursor-pointer w-full bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-0.5'
                            >
                                <h2 className='text-xl font-semibold mb-2'>{post.title}</h2>
                                <p className='text-gray-800 line-clamp-3'>{post.content}</p>
                                <div className='flex justify-end pt-4'>
                                    <p className='text-sm text-gray-500'>Posted {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
                                </div>
                            </li>
                        ))
                ) : (
                    <p className='text-gray-500 pl-10'>No posts match your search.</p>
                )}
            </ul>
        </div>
    );
}
