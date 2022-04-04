import Nav from "../components/Nav"
import {useEffect, useState} from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

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
        <Nav/>
        { user &&
        <div className="dashboard">
            <div className='match-card' user={user}>
                <h2 className='match-header'>Matched with: {user?.[matchNumber].username}</h2>
                <p> {user?.[matchNumber].bio} </p>
                <p> {user?.[matchNumber].firstName} </p>

                <div className='match-buttons'>
                    <button className='dislike' onClick={ondislike}>Dislike</button>
                    <button className='like' onClick={onlike}>Like</button>
                </div>
            </div>
        </div>
    }
        </>
    ) 
}

export default Dash