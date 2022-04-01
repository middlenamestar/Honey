import Nav from "../components/Nav"
import { useState } from 'react'
import AuthBuild from "../components/AuthBuild"

const Home = () => {
    const [showBuild, setShowBuild] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    
    const authToken = false //building with dummy authToken, change true/false affect button text/functionality?

    const handleClick = () => {
        console.log("You've clicked")
        setShowBuild(true)
        setIsSignUp(true)
    }
    return (
        <div className="overlay">
            {/* WEB API dynamic size rendering*/}
            <Nav mobile={false}
            setShowBuild={setShowBuild} showBuild={showBuild} setIsSignUp={setIsSignUp}
            />
            <div className="home">
                <h1 className="text-center primaryTagLine">Tag Line Here</h1>
                <button className="primaryBtn" onClick={handleClick} disabled={showBuild}>
                    {authToken ? 'Log Out' : 'Create Account'} {/* if user is logged in render logout button, else render Create Account button*/}
                </button>

                {showBuild && (
                    <AuthBuild setShowBuild={setShowBuild} setIsSignUp={setIsSignUp} isSignUp={isSignUp}/>
                )}

            </div>
        </div>
    )
}

export default Home