import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

function Logo() {
    const user = useAuthStore((state) => state.user);

    const homePath = user ? '/app' : '/';

    return (
        <Link to={homePath} className='text-3xl font-extrabold uppercase'>
            Posts
        </Link>
    );
}

export default Logo;
