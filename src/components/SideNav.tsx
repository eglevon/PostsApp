import SideNavLink from './SideNavLink';

function SideNav() {
    return (
        <div className='flex md:flex-col justify-around md:justify-start items-center gap-4 md:gap-6 md:min-h-full bg-white shadow-md md:shadow-none p-3 md:pt-8'>
            <SideNavLink to='/app/posts' end>
                All posts
            </SideNavLink>
            <SideNavLink to='/app/myposts'>My posts</SideNavLink>
            <SideNavLink to='/app/create'>Create a post</SideNavLink>
        </div>
    );
}

export default SideNav;
