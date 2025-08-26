import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

function SignInButton() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const signOut = useAuthStore((state) => state.signOut);

    const handleSignInClick = () => {
        navigate('/signin');
    };

    const handleSignOutClick = () => {
        signOut();
        navigate('/');
    };

    if (user) {
        return (
            <div>
                <p>Welcome, {user.firstname}</p>
                <button type='button' onClick={handleSignOutClick} className='w-25 bg-purple-600 hover:bg-purple-950 text-white py-2 rounded-lg transition'>
                    Sign Out
                </button>
            </div>
        );
    }

    return (
        <button type='button' onClick={handleSignInClick} className='w-25 bg-purple-600 hover:bg-purple-950 text-white py-2 rounded-lg transition'>
            Sign In
        </button>
    );
}

export default SignInButton;
