import useFetchPosts from '../hooks/useFetchPosts';
import { PostsList } from '../components/PostsList';

function AllPostsPage() {
    const { data: posts = [], isLoading, isError, error } = useFetchPosts();

    return (
        <div>
            <h2 className='flex justify-center text-2xl font-bold pt-4 mb-2'>All Posts</h2>
            <PostsList posts={posts} loading={isLoading} error={isError ? error.message : null} />
        </div>
    );
}

export default AllPostsPage;
