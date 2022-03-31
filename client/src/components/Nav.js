// Store logo images in images folder, then import them here
// Tinder uses two logos, a plain logo for the larger page, and a color logo for the minizimed/mobile layout

import smallLogo from '../images/colorLogoPlaceholder.jpg'
import bigLogo from '../images/plainLogoPlaceholder.jpg'

const Nav = ({ mobile, authToken, setShowBuild, showBuild, setIsSignUp }) => {
    
    const handleClick = () => {
        setShowBuild(true)
        setIsSignUp(false)
    }
    
    
    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={mobile ? smallLogo : bigLogo} alt="Company Logo" />
                
            </div>
            {!authToken && !mobile  && <button 
            className="navBtn" 
            onClick={handleClick}
            disabled={showBuild}
            >Log in</button>}
        </nav>
        
    ) 
}

export default Nav