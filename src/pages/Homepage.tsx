import Posts from './AllPostsPage';

function Homepage() {
    return (
        <main className='w-full bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] pt-3 mb-4 px-2'>
            <Posts />
        </main>
    );
}

export default Homepage;
