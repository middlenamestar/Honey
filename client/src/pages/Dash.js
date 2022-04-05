import Navigation from "../components/Nav"
import {useEffect, useState} from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';

const Dash = () => {
    const [user, setUser] = useState(null)
    const [cookies,] = useCookies(['user'])
 //setCookie, removeCookie
    const userId = cookies.UserId
    const navigate = useNavigate();
    const getUser = async () => {
        try {
            const response = await axios.get('/api/users', {
                params: {userId}
            })
            setUser(response.data)
            console.log(response.data)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

   // console.log('user', user)
    //console.log(user?.[1].username)

    // this might not work
    for (var i = 0; i < user?.length; i++) {
        console.log(user?.length)
        var matchNumber = parseInt(Math.random() * (user?.length-1 ))
    } 

    // to get random user - not gonna work??
    // const randomUser = user.map(user => {
    //     return Math.floor(Math.random(user))
    // })
    
    // const randomUser = (user) => {
    //     return Math.floor(Math.random(user))
    // }
    // console.log(randomUser(user))

    // put route for those that match is clicked, next user for that no match is clicked...
    // get rid of previously saved users?
    const likedUserID =user?.[matchNumber]._id
    const onlike = async () => {
        try {
            let payload ={
                likedUserID: likedUserID
            }
            const response = await axios.put(`/api/users/${userId}`,payload)
            
            console.log(response)
        } catch(error) {
            console.log(error)
        }
        window.location.reload()
    }
    const ondislike = async () =>{
        window.location.reload()
    }

    return (
        <>
            <Navigation/>

                <Container className="my-2">
                    <Row className="justify-content-center">

                        <Card style={{ width: '24rem', borderRadius: '17px' }} className="my-3">
                            { user &&
                                <div user={user}>

                                    {/* render profile pic */}
                                    {user?.[matchNumber].imageURL ?
                                        <Card.Img className="my-2" variant="top" src={user?.[matchNumber].imageURL} alt="profile pic"/>
                                        :
                                            <Card.Img className="my-2" variant="top" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
                                    }

                                    <Card.Body>

                                    <Card.Title>You matched with:</Card.Title>

                                    <Card.Text>
                                        <h3 style={{ color: 'rgb(106, 106, 162)' }}>{user?.[matchNumber].username}</h3>

                                        <p>{user?.[matchNumber].bio}</p>

                                        <h5 className="my-2">Currently Watching: </h5>
                                            {user[matchNumber].animeTitles.map((items)=>{ 
                                                return(<p>{items}</p>)
                                                
                                            })}
                                    </Card.Text>

                                    <div className='match-buttons'>
                                        <Button variant="outline-dark" className='like' onClick={onlike}>Match</Button>
                                        {" "}
                                        <Button variant="outline-dark" className='dislike' onClick={ondislike}>Umm.. Next!</Button>
                                    </div>

                                    </Card.Body>
                                </div>
                            }
                    </Card>
                </Row>
            </Container>
        </>
    ) 
};

export default Dash;