import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

function PageNotFound() {
    const user = useAuthStore((state) => state.user);

    const homePath = user ? '/app' : '/';

    return (
        <div className='flex flex-col items-center h-screen pt-35 bg-gray-100'>
            <h1 className='text-6xl font-bold text-gray-800 mb-4'>404</h1>
            <p className='text-xl text-gray-600 mb-6'>Sorry, the page you are looking for was not found.</p>
            <Link to={homePath} className='px-6 py-2 bg-purple-600  text-white rounded-lg hover:bg-purple-950 transition'>
                Go Home
            </Link>
        </div>
    );
}

export default PageNotFound;
