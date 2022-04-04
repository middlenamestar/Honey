// Store logo images in images folder, then import them here
// Tinder uses two logos, a plain logo for the larger page, and a color logo for the minizimed/mobile layout

import { useCookies } from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import smallLogo from '../images/colorLogoPlaceholder.jpg'
import bigLogo from '../images/honeylogo.png'

const Nav = ({ props, mobile, setShowBuild, showBuild, setIsSignUp }) => {
    const [cookies, setCookie, removeCookie] =useCookies(['user'])
    const handleClick = () => {
        setShowBuild(true)
        setIsSignUp(false)
    }
    let navigate =useNavigate()
    const LogOuthandleClick  =() =>{
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        navigate('/')
    }

    const authToken = cookies.AuthToken
    const tabs = ['Dash', 'Room', 'Donations Page', 'Profile']
    
    const loginFlip = () =>{
        if(!authToken && !mobile){
            return true
        } else{
            return false
        }
    }

    return (
        <nav>
            <div className='logoNavContainer'>
            <div className="logoContainer">
                <img className="logo" src={mobile ? smallLogo : bigLogo} alt="Company Logo" />
                
            </div>
            <ul className='navBar'>

            {tabs.map(tab => (
                <li className='navItem' key={tab}>
                    {/* // ternary operator for link to page depending on which page user is on -- fix later if issues? */}
                    <a href={tab.split(" ").join("").toLowerCase()} onClick={() => props.handlePageChange(tab)}>
                        {tab}
                    </a>
                </li>
            ))} 

        </ul>
            </div>   
            {loginFlip()?  <button 
            className="navBtn" 
            onClick={handleClick}
            disabled={showBuild}
            >Log in</button> : <button 
            className="navBtn" 
            onClick={LogOuthandleClick}
            disabled={showBuild}
            >Log out</button>  }
        </nav>
        
    ) 
}

export default Nav