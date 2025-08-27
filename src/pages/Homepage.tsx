import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import AllPostsPage from './AllPostsPage';

function Homepage() {
    const user = useAuthStore((state) => state.user);

    if (user) {
        return <Navigate to='/app' replace />;
    }

    return (
        <main className='w-full bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] pt-3 mb-4 px-2'>
            <AllPostsPage />
        </main>
    );
}

export default Homepage;
