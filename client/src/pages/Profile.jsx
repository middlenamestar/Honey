import React, {Link, useState, useEffect} from 'react'
import Nav from '../components/Nav'
import "./profile.css"
require('dotenv').config();





 const Profile = () => {
    const getUserData= async () => {
        let result = await fetch(`http://localhost:3001/api/users/6248a65d68396ee888032499`,{
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result= await result.json()
        console.log(result.myAnimeListUsername)
    }
   // const [MALProfile, setMALProfile] = useState(myAnimeListUsername)
   useEffect(() => {
       getUserData();
   }, []);

  return (
<div>
        <Nav/>
    <header>
        <div className="container">
            <div className="profile">
                <div className="profile-image">
                    <button className='profileButton'>
                    <img src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" alt=""/>
                    </button>
                </div>
                <div className="profile-user-settings">
                    <h1 className="profile-user-name">janedoe_</h1>
                    <button className="btn profile-edit-btn">Edit Profile</button>
                </div>
                <div className="profile-stats">
                    <ul>
                        <li><span className="profile-stat-count">164</span> posts</li>
                        <li><span className="profile-stat-count">188</span> followers</li>
                        <li><span className="profile-stat-count">206</span> following</li>
                    </ul>
                </div>
                <div className="profile-bio">
                    <p><span className="profile-real-name">Jane Doe</span> Lorem ipsum dolor sit, amet consectetur adipisicing elit 📷✈️🏕️</p>
                </div>
            </div>
        </div>
    </header>

<main>

<div className="container">

    <div className="gallery">

        <div className="gallery-item" tabindex="0">
            <img src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop" class="gallery-image" alt=""/>
        </div>

        <div className="gallery-item" tabindex="0">
            <img src="https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop" class="gallery-image" alt=""/>
        </div>

        <div className="gallery-item" tabindex="0">
            <img src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=500&fit=crop" class="gallery-image" alt=""/>
        </div>

        <div className="gallery-item" tabindex="0">
            <img src="https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop" class="gallery-image" alt=""/>
        </div>

        <div className="gallery-item" tabindex="0">
            <img src="https://images.unsplash.com/photo-1498471731312-b6d2b8280c61?w=500&h=500&fit=crop" class="gallery-image" alt=""/>
        </div>

        <div className="gallery-item" tabindex="0">
            <img src="https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=500&h=500&fit=crop" class="gallery-image" alt=""/>
        </div>

        <div className="gallery-item" tabindex="0">
            <img src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=500&h=500&fit=crop" class="gallery-image" alt=""/>
        </div>

        <div className="gallery-item" tabindex="0">
            <img src="https://images.unsplash.com/photo-1515814472071-4d632dbc5d4a?w=500&h=500&fit=crop" class="gallery-image" alt=""/>
        </div>

        <div className="gallery-item" tabindex="0">
            <img src="https://images.unsplash.com/photo-1511407397940-d57f68e81203?w=500&h=500&fit=crop" class="gallery-image" alt=""/>
        </div>

        <div class="gallery-item" tabindex="0">
            <img src="https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=500&h=500&fit=crop" class="gallery-image" alt=""/>
        </div>

        <div className="gallery-item" tabindex="0">
            <img src="https://images.unsplash.com/photo-1505058707965-09a4469a87e4?w=500&h=500&fit=crop" class="gallery-image" alt=""/>
        </div>

        <div className="gallery-item" tabindex="0">
            <img src="https://images.unsplash.com/photo-1423012373122-fff0a5d28cc9?w=500&h=500&fit=crop" class="gallery-image" alt=""/>
        </div>

    </div>
</div>


</main>
    
    
    
    
    
    </div>
  )
}
export default Profile
