import { useParams } from 'react-router-dom';
import { PostsList } from '../components/PostsList';
import useUserPosts from '../hooks/useUserPosts';

function UserPostsPage() {
    const { authorId } = useParams<{ authorId: string }>();
    const { data: posts = [], isLoading, isError, error } = useUserPosts(authorId || '');

    return (
        <div>
            <h2 className='flex justify-center text-2xl font-bold pt-4 mb-2'>Posts by {authorId}</h2>
            <PostsList posts={posts} loading={isLoading} error={isError ? error.message : null} />
        </div>
    );
}

export default UserPostsPage;
