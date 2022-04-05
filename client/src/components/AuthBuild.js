import { useState } from "react"
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import { Button } from 'react-bootstrap';


const AuthBuild = ({setShowBuild, isSignUp }) => {
    const [ email, setEmail ] = useState(null)
    const [ password, setPassword ] = useState(null)
    const [ validatePassword, setValidatePassword ] = useState(null)
    const [ error, setError ] = useState(null)
    const [ cookies, setCookie, removeCookie] = useCookies('user')
    // console.log(email, password, validatePassword)
    let navigate =useNavigate()
    
    const handleClick = () => {
        setShowBuild(false)
    }
    
    const handleSubmitLocal = async (event) => {
        event.preventDefault()
        console.log("click")
        try {
            if(isSignUp && (password !== validatePassword)) {
                setError("Passwords don't match, please try again")
                return
            }
            const response = await axios.post(`http://localhost:3001/${isSignUp? 'signup': 'login'}` , {email, password})

            setCookie('UserId', response.data.userId)
            setCookie('AuthToken', response.data.token)
            
            const success =response.status === 201;

            if(success && isSignUp){
                navigate('/signup')
                window.location.reload()
            }
            else if(success && !isSignUp){
                navigate('/dash')
                window.location.reload()
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div>

                <h5>{isSignUp ? 'Create Account' : 'Login' }</h5>

                <form onSubmit={handleSubmitLocal}>
                    <input
                        className="form-control"
                        type='email'
                        id='email'
                        name='email'
                        placeholder="email"
                        required={true}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <input
                        className="form-control"
                        type='password'
                        id='password'
                        name='password'
                        placeholder="password"
                        required={true}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {isSignUp && <input
                        className="form-control"
                        type='password'
                        id='passwordValidate'
                        name='passwordValidate'
                        placeholder="Confirm Password"
                        required={true}
                        onChange={(event) => setValidatePassword(event.target.value)}
                    />}

                    <input className="" type="submit"/>

                    <p>{error}</p>

                </form>

                <div className="my-2">
                    <p onClick={handleClick}>Close</p>
                </div>

            </div>
        </>
    ) 
};

export default AuthBuild;