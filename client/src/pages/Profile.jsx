import axios from 'axios';
import React, {Link, useState, useEffect} from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Nav';
import "./profile.css";
import { Container, Button, Row, Col, Image } from 'react-bootstrap';

require('dotenv').config();

const styles = {
    round: {
        borderRadius: "18px"
    }
}

const Profile = () => {

    const [user, setUser] = useState(null)
    const [userAnime, setUserAnime] = useState(null)
    const [cookies,setCookie, removeCookie] = useCookies(['user'])
    let navigate = useNavigate();
    const userId= cookies.UserId;
 
    const getUserData= async () => {
        try{
            const response = await axios.get('/user', {
                params:{userId}
            })
                setUser(response.data)
                getUserAnime(response.data.myAnimeListUsername);
            console.log("response", response.data.matches.map((item)=>{
                return(item)
            }))
            
        }catch(err){
            console.log(err)
        }
        return user
    }

    const getUserAnime = async (malUser) => {
        try{
            const response = await axios.get('/userAnime',{
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
                <Navigation/>

                    <Container className='my-4'>

                        {/* USER INFO BOX */}
                        <Container fluid>
                            <Row>

                                <Col>
                                    {/* profile pic */}
                                    <Image style={styles.round} fluid="true" src={user.imageURL} alt="user profile pic"/>
                                </Col>

                                <Col>
                                    {/* user NAME! */}
                                    <h2 className="profile-user-name">{user.username}</h2>

                                    {/* edit profile */}
                                    <Button variant="dark" className="mb-2" onClick={goToUpdate}>edit profile</Button>
                                    
                                    {/* bio */}
                                    <div className='my-3'>
                                        <p>{user.bio}</p>
                                    </div>

                                    {/* MATCHES */}
                                    <div className='my-4'>
                                        <h5 className='my-2'>Matches (luv connections):</h5>
                                        <ul style={{ listStyleType: "none" }}>
                                            {user.matches.map((item)=>{return(<li key={item.ManmadeID}>{item.username}</li>)})}
                                        </ul>
                                    </div>
                                </Col>

                            </Row>
                        </Container>

                        {/* ANIMES */}
                        <Container fluid>
                            <Row className='mt-5 mb-2'>
                                <h5>My anime list</h5>
                            </Row>

                            <Row xl={4} lg={3} md={2} sm={2} xs={2} className="text-center">
                                {userAnime.map((items)=>{
                                    return (
                                        <Col className="my-2" tabIndex="0" key={items.node.id}>
                                            <Image fluid="true" src={items.node.main_picture.medium.replace(/\\/g,'')} alt="anime title pic"/>
                                        {/* <div>
                                            <p>{items.node.title}</p>
                                        </div> */}

                                        </Col>

                                    )
                                })}
                        </Row>
                    </Container>

                </Container>
            </div>
        }
    </>
  )
};

export default Profile;