import Navigation from "../components/Nav";
import { React, useState } from 'react';
import AuthBuild from "../components/AuthBuild";
import { useCookies } from "react-cookie";
import {useNavigate} from 'react-router-dom';
import 'animate.css';
import ReactPlayer from 'react-player';
import { isTrivialHref } from "@restart/ui/esm/Anchor";


const Home = () => {
    const [showBuild, setShowBuild] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [showCreate, setshowCreate] = useState(false)

    // building with dummy authToken, change true/false affect button text/functionality?
    const authToken = cookies.AuthToken

    // create account handleclick.
    const handleClick = () => {
        console.log("You've clicked")
        setShowBuild(true)
        setIsSignUp(true)
    };

    // login handleclick.
    const handleClickLogin = () => {
        console.log("You've clicked")
        setShowBuild(true)
        setIsSignUp(false)
    };

    // logout handleclick.
    let navigate = useNavigate();
    const LogOuthandleClick  =() =>{
        removeCookie('UserId', cookies.UserId);
        removeCookie('AuthToken', cookies.AuthToken);
        window.location.reload()
        navigate('/');
    }; console.log('authToken', authToken)

    const loginFlip = () =>{
        if(!authToken) {
            return true;
            
        } else {
            return false;
        }
    };console.log('login', loginFlip())

    return (
        <>
            <Navigation />

            {/* homepage container */}
            <div className="container my-4">
                <div className="row">
                    <div className="col text-center">

                        <h1 className="animate__animated animate__fadeInDown animate__slower">Honey</h1>

                        <h2 className="animate__animated animate__fadeIn animate__delay-2s animate__slower">Hanī</h2>

                        <h2 className="animate__animated animate__fadeIn animate__delay-3s animate__slower">ハニー</h2>

                        <div className="animate__animated animate__fadeIn animate__delay-4s animate__slower">
                            <ReactPlayer
                                url='https://youtu.be/Eq6EYcpWB_c'
                                volume='null'
                                muted='true'
                                playing='true'
                                loop='true'
                            />
                        </div>

                        <h2 className="animate__animated animate__fadeIn animate__delay-5s animate__slower">A new dating app for anime lovebirds</h2>

                        {/* CREATE ACCOUNT BUTTON */}
                        {loginFlip() ? <button className="animate__animated animate__fadeIn animate__delay-5s animate__slower" onClick={handleClick} disabled={showBuild}>
                                {/* if user is logged in render LOG OUT button, else, render Create Account button. */}
                                {/* {authToken ? 'Log Out' : 'Create Account'} */} Create Account
        
                        </button> : ""}

                        {/* LOGIN BUTTON */}
                        {loginFlip() ?  <button 
                            className="animate__animated animate__fadeIn animate__delay-5s animate__slower"
                            onClick={handleClickLogin}
                            disabled={showBuild}
                            >Log in</button> : <button 
                            className="animate__animated animate__fadeIn animate__delay-5s animate__slower" 
                            onClick={LogOuthandleClick}
                            disabled={showBuild}
                            >Log out</button>}

                        {showBuild && (
                            <AuthBuild setShowBuild={setShowBuild} setIsSignUp={setIsSignUp} isSignUp={isSignUp}/>
                        )}

                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;