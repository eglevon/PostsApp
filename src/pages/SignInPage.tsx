import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import type { SignInData } from '../types/SignInData';
import { useAuthStore } from '../store/useAuthStore';
import { useEffect } from 'react';

function SignInPage() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInData>();

    const signIn = useAuthStore((state) => state.signIn);
    const error = useAuthStore((state) => state.error);
    const user = useAuthStore((state) => state.user);

    const onSubmit = async (data: SignInData) => {
        await signIn(data.email, data.password);
    };

    useEffect(() => {
        if (user) {
            navigate('/app');
        }
    }, [user, navigate]);

    return (
        <main className='flex items-start justify-center min-h-screen pt-30 bg-[rgb(var(--color-bg))]'>
            <div className='w-full max-w-md p-6 bg-white rounded-2xl shadow-md'>
                <h2 className='text-2xl font-bold text-center mb-6'>Sign In</h2>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium'>
                            Email
                        </label>
                        <input
                            id='email'
                            type='email'
                            placeholder='Enter your email'
                            className='w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300'
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor='password' className='block text-sm font-medium'>
                            Password
                        </label>
                        <input
                            id='password'
                            type='password'
                            placeholder='Enter your password'
                            className='w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300'
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters',
                                },
                            })}
                        />
                        {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
                    </div>

                    <button type='submit' disabled={isSubmitting} className='w-full bg-purple-600 hover:bg-purple-950 text-white py-2 rounded-lg transition'>
                        {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </button>

                    {error && <p className='text-red-500 text-sm mt-2 text-center'>{error}</p>}
                </form>

                <p className='text-sm text-center mt-4'>
                    Don’t have an account?{' '}
                    <Link to='/signup' className='text-purple-600 hover:underline'>
                        Sign Up
                    </Link>
                </p>
            </div>
        </main>
    );
}

export default SignInPage;
