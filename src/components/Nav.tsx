function Nav() {
    return (
        <nav>
            <ul className="flex gap-3 text-gray-900 dark:text-white">
                <li className="font-bold">
                    <a href="#home" className="hover:underline">Home</a>
                </li>
                <li>
                    <a href="#about" className="hover:underline">Sobre</a>
                </li>
                <li>
                    <a href="#contact" className="hover:underline">Contato</a>
                </li>
            </ul>
        </nav>
    )
}

export default Nav