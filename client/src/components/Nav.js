// Store logo images in images folder, then import them here
// Tinder uses two logos, a plain logo for the larger page, and a color logo for the minizimed/mobile layout

import smallLogo from '../images/colorLogoPlaceholder.jpg'
import bigLogo from '../images/honeylogo.png'

const Nav = ({ props, mobile, authToken, setShowBuild, showBuild, setIsSignUp }) => {
    
    const handleClick = () => {
        setShowBuild(true)
        setIsSignUp(false)
    }

    const tabs = ['dash', 'room']
    
    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={mobile ? smallLogo : bigLogo} alt="Company Logo" />
                
            </div>
            <ul className='navBar'>
            {tabs.map(tab => (
                <li className='navItem' key={tab}>
                    {/* // ternary operator for link to page depending on which page user is on -- fix later if issues? */}
                    <a href={tab} onClick={() => props.handlePageChange(tab)}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </a>
                </li>
            ))}
        </ul>
            {!authToken && !mobile  && <button 
            className="navBtn" 
            onClick={handleClick}
            disabled={showBuild}
            >Log in</button>}
        </nav>
        
    ) 
}

export default Nav