import { useMyPosts } from '../hooks/useMyPosts';
import { PostsList } from '../components/PostsList';

function MyPostsPage() {
    const { data: posts = [], isLoading, isError, error } = useMyPosts();

    return (
        <div>
            <h2 className='flex justify-center text-2xl font-bold pt-4 mb-2'>My Posts</h2>
            <PostsList posts={posts} loading={isLoading} error={isError ? error.message : null} />
        </div>
    );
}

export default MyPostsPage;
