const AuthBuild = ({setShowBuild }) => {
    
    
    const handleClick = () => {
        setShowBuild(false)
    }
    
    const isSignUp = true
    const handleSubmitGoogle = (event) => {
        event.preventDefault()
        console.log("click")
        // CHRIS' AUTH AREA
    }
    const handleSubmitLocal = (event) => {
        event.preventDefault()
        console.log("click")
        // CHRIS' AUTH AREA
    }
    return (
        <div className="authBuild">
            <div className="closeText" onClick={handleClick}>Close</div>
            <h2>{isSignUp ? 'Create Account' : 'Log In' }</h2>
            <p>This is a privacy/data warning</p>
            <button className="googleBtn"onClick={handleSubmitGoogle}>Create your account with Google</button>
            <button className="secondaryBtn"onClick={handleSubmitLocal}>Create your account with us</button>
                {/* LINK TO GOOGLE AUTH HERE? */}
            {/* AUTH BUILD */}
        </div>
    ) 
}

export default AuthBuild