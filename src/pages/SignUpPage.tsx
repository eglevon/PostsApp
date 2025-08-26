import { useForm } from 'react-hook-form';
import type { SignUpData } from '../types/SignUpData';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignUpPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpData>();

    const navigate = useNavigate();

    const signUp = useAuthStore((state) => state.signUp);
    const error = useAuthStore((state) => state.error);

    const onSubmit = async (data: SignUpData) => {
        await signUp(data);

        toast.success('You have registered successfully!');
        navigate('/app');
    };

    return (
        <main className='flex items-start justify-center min-h-screen pt-30 bg-[rgb(var(--color-bg))]'>
            <div className='w-full max-w-md p-6 bg-white rounded-2xl shadow-md'>
                <h2 className='text-2xl font-bold text-center mb-6'>Sign Up</h2>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <div>
                        <label htmlFor='firstname' className='block text-sm font-medium'>
                            First Name
                        </label>
                        <input id='firstname' type='text' placeholder='Enter your first name' className='w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300' {...register('firstname', { required: 'First name is required' })} />
                        {errors.firstname && <p className='text-red-500 text-sm mt-1'>{errors.firstname.message}</p>}
                    </div>

                    <div>
                        <label htmlFor='lastname' className='block text-sm font-medium'>
                            Last Name
                        </label>
                        <input id='lastname' type='text' placeholder='Enter your last name' className='w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300' {...register('lastname', { required: 'Last name is required' })} />
                        {errors.lastname && <p className='text-red-500 text-sm mt-1'>{errors.lastname.message}</p>}
                    </div>

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
                        {isSubmitting ? 'Signing up...' : 'Sign Up'}
                    </button>

                    {error && <p className='text-red-500 text-sm mt-2 text-center'>{error}</p>}
                </form>
            </div>
        </main>
    );
}

export default SignUpPage;
