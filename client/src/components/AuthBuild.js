import { useState } from "react"

const AuthBuild = ({setShowBuild, isSignUp }) => {
    const [ email, setEmail ] = useState(null)
    const [ password, setPassword ] = useState(null)
    const [ validatePassword, setValidatePassword ] = useState(null)
    const [ error, setError ] = useState(null)

    // console.log(email, password, validatePassword)

    
    const handleClick = () => {
        setShowBuild(false)
    }

    // FUTURE DEVELOPMENT GOOGLE LOG IN
    // const handleSubmitGoogle = (event) => {
    //     event.preventDefault()
    //     console.log("click")
    //     // CHRIS' AUTH AREA
    // }
    
    
    const handleSubmitLocal = (event) => {
        event.preventDefault()
        console.log("click")
        try {
            if(isSignUp && (password !== validatePassword)) {
                setError("Passwords don't match, please try again")
            }
            console.log('make a post req to DB')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="authBuild">
            <div className="closeText" onClick={handleClick}>Close</div>
            <h2>{isSignUp ? 'Create Account' : 'Log In' }</h2>
            <p>This is a privacy/data warning</p>
            <form onSubmit={handleSubmitLocal}>
                <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder="email"
                    required={true}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type='password'
                    id='password'
                    name='password'
                    placeholder="password"
                    required={true}
                    onChange={(event) => setPassword(event.target.value)}
                />      
                {isSignUp && <input
                    type='password'
                    id='passwordValidate'
                    name='passwordValidate'
                    placeholder="Confirm Password"
                    required={true}
                    onChange={(event) => setValidatePassword(event.target.value)}
                />}
                <br/>
                <input className="secondaryBtn" type="submit"/>
                <p>{error}</p>                          
            </form>

        </div>
    ) 
}

export default AuthBuild