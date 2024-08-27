import './styles.scss'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

function Navbar() {
    const [isResponsiveNav, setIsResponsiveNav] = useState(false);
    const navRef = useRef();

    const showNavbar = () => {
        setIsResponsiveNav(!isResponsiveNav);
    }

    const navClassName = isResponsiveNav ? 'responsive_nav' : 'nav';

    return(
        <nav className='navbar'>
            <div className={navClassName} ref={navRef}>
                <ul className='nav-ul'>
                    <Link className='li' to='/'>Spell List</Link>
                    <Link className='li' to='/Repertoire'>Spell Repertoire</Link>
                    <button className='nav-btn nav-close-btn' onClick={showNavbar}>
                        <FaTimes />
                    </button>
                </ul>
            </div>
            <button className='nav-btn' onClick={showNavbar}>
                    <FaBars />
            </button>
        </nav>
    ); 
}

export default Navbar