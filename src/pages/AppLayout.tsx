import { Outlet } from 'react-router-dom';
import SideNav from '../components/SideNav';

function AppLayout() {
    return (
        <main className='bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] min-h-screen flex flex-col md:flex-row gap-6 p-4'>
            <div className='w-full md:w-45 md:flex-none'>
                <SideNav />
            </div>
            <div className='md:flex-1 md:overflow-auto'>
                <Outlet />
            </div>
        </main>
    );
}

export default AppLayout;
