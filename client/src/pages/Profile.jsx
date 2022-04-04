import axios from 'axios';
import React, {Link, useState, useEffect} from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav'
import "./profile.css"

require('dotenv').config();





 const Profile = () => {

    const [user, setUser] = useState(null)
    const [userAnime, setUserAnime] = useState(null)
    const [cookies,setCookie, removeCookie] = useCookies(['user'])
    let navigate = useNavigate();
    const userId= cookies.UserId;
 
    const getUserData= async () => {
        try{
            const response = await axios.get('http://localhost:3001/user', {
                params:{userId}
            })
                setUser(response.data)
                getUserAnime(response.data.myAnimeListUsername);
            
            
        }catch(err){
            console.log(err)
        }
        return user
    }

    const getUserAnime = async (malUser) => {
        try{
            const response = await axios.get('http://localhost:3001/userAnime',{
                params:{malUser}
            })
            setUserAnime(response.data)
        }catch(err){
            console.log(err)
        }
    }

    const goToUpdate = async () =>{
        navigate('/signup')
    }
 

   useEffect(() => {
      getUserData()
  }, []);



  return (
 <>  
 {user && userAnime &&
<div>
        <Nav/>
    <header>
        <div className="container">
            <div className="profile">
                <div className="profile-image">
                    <button className='profileButton'>
                    <img src={user.imageURL} alt=""/>
                    </button>
                </div>
                <div className="profile-user-settings">
                    <h1 className="profile-user-name">{user.username}</h1>
                    <button className="btn profile-edit-btn" onClick={goToUpdate}>Edit Profile</button>
                </div>

                <div className="profile-bio">
                    <p><span className="profile-real-name">{user.username}</span> {user.bio}</p>
                </div>
            </div>
        </div>
    </header>

<main>

<div className="container">

    <div className="gallery">
        {userAnime.map((items)=>{
            return(
        <div className="gallery-item" tabIndex="0" key ={items.node.id}>
            <img src={items.node.main_picture.medium.replace(/\\/g,'')} className="gallery-image" alt=""/>
        </div>
            )
        })}

    </div>
</div>


</main>
    
    
    
    
    
    </div>
 }
</>   
  )
}
export default Profile
