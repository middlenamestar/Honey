import Navigation from "../components/Nav";
import { React, useState } from 'react';
import AuthBuild from "../components/AuthBuild";
import { useCookies } from "react-cookie";
import {useNavigate} from 'react-router-dom';
import 'animate.css';
import ReactPlayer from 'react-player';
import { isTrivialHref } from "@restart/ui/esm/Anchor";
import { Button } from 'react-bootstrap';

const Home = () => {
    const [showBuild, setShowBuild] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

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

                        <h2 className="animate__animated animate__fadeIn animate__delay-2s animate__slower">hanī: ハニー</h2>

                        <div className="animate__animated animate__fadeIn animate__delay-3s animate__slower player-wrapper px-5 my-3">
                            <ReactPlayer
                                url='https://youtu.be/Eq6EYcpWB_c'
                                className='react-player'
                                volume='null'
                                muted='true'
                                playing='true'
                                loop='true'
                                width='100%'
                                height='100%'
                            />
                        </div>

                        <h2 className="animate__animated animate__fadeIn animate__delay-4s animate__slower mt-4">A new dating app for anime lovebirds</h2>

                        {/* CREATE ACCOUNT BUTTON */}
                        {loginFlip() ? <Button variant="dark" className="animate__animated animate__fadeIn animate__delay-4s animate__slower my-4" onClick={handleClick} disabled={showBuild}>
                            Create Account
                        </Button> : ""}
                        {"  "}
                        {/* LOGIN BUTTON */}
                        {loginFlip() ?  <Button 
                            variant="dark"
                            className="animate__animated animate__fadeIn animate__delay-4s animate__slower my-4"
                            onClick={handleClickLogin}
                            disabled={showBuild}
                            >Login</Button> : ""}

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