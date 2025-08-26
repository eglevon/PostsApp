import { NavLink, type NavLinkProps } from 'react-router-dom';

function SideNavLink({ to, end, children }: NavLinkProps & { children: React.ReactNode }) {
    return (
        <NavLink to={to} end={end} className={({ isActive }) => `transition-colors duration-200 ${isActive ? 'text-[rgb(var(--color-primary))]' : 'text-[rgb(var(--color-text))]'} hover:text-[rgb(var(--color-primary))]`}>
            {children}
        </NavLink>
    );
}

export default SideNavLink;
