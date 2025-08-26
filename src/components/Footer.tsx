function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <div className='w-full h-8 pt-4 pr-8 flex justify-end'>
            <p>&copy; {currentYear} Posts</p>
        </div>
    );
}

export default Footer;
