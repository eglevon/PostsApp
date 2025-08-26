import Logo from './Logo';
import SignInButton from './SignInButton';

function Header() {
    return (
        <div className='w-full h-20 px-8 flex justify-between items-center bg-[rgb(var(--color-primary))]'>
            <Logo />
            <SignInButton />
        </div>
    );
}

export default Header;
