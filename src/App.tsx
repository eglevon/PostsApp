import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Homepage from './pages/Homepage';
import Header from './components/Header';
import Footer from './components/Footer';
import AppLayout from './pages/AppLayout';
import AllPostsPage from './pages/AllPostsPage';
import SignInPage from './pages/SignInPage';
import PageNotFound from './pages/PageNotFound';
import SignUpPage from './pages/SignUpPage';
import CreatePost from './components/CreatePost';
import PostPage from './pages/PostPage';
import MyPostsPage from './pages/MyPostsPage';
import ProtectedRoute from './components/ProtectedRoute';
import UserPostsPage from './pages/UserPostsPage';

function App() {
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const user = localStorage.getItem('user');

        if (accessToken && refreshToken && user) {
            useAuthStore.setState({
                accessToken,
                refreshToken,
                user: JSON.parse(user),
            });
        }
    }, []);

    return (
        <BrowserRouter>
            <Header />

            <ToastContainer position='top-center' autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />

            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='signin' element={<SignInPage />} />
                <Route path='signup' element={<SignUpPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path='app' element={<AppLayout />}>
                        <Route index element={<Navigate to='posts' replace />} />
                        <Route path='posts' element={<AllPostsPage />} />
                        <Route path='posts/:id' element={<PostPage />} />
                        <Route path='myposts' element={<MyPostsPage />} />
                        <Route path='userposts/:authorId' element={<UserPostsPage />} />
                        <Route path='create' element={<CreatePost />} />
                    </Route>
                </Route>
                <Route path='*' element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
