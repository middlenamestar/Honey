import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import ProfilePic from '../components/uploadPic';
import '../styles/signup.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const styles = {
    txtAreaResize: {
        resize: 'none'
    }
};

const Signup = () => {
    const [ cookies, setCookie, removeCookie] = useCookies('user')
    const [user, setUser] = useState(null)
    const userId= cookies.UserId;
    let responseData
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        username: '',
        malUsername: '',
        bdayMo: '',
        bdayDay: '',
        bdayYear: '',
        bio: '',
        // email: '',
        // imageUrl: '',
        matches: []
    })
    const getUserData= async () => {
        try{
            const response = await axios.get('http://localhost:3001/user', {
                params:{userId}
            })
            setUser(response.data)
            responseData=response.data
            console.log("response",responseData)
            setFormData({
                user_id: cookies.UserId,
                username:responseData.username ,
                malUsername:responseData.myAnimeListUsername ,
                bdayMo:responseData.dobMonth,
                bdayDay: responseData.dobDay,
                bdayYear: responseData.dobYear,
                bio: responseData.bio,
                // email: '',
                // imageUrl: '',
                matches: []
            })
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        getUserData();
    }, []);





    let navigate =useNavigate()

    const handleSubmit = async (e) => {
        console.log('submit')
        e.preventDefault()
        try{
          const response =  await axios.put('http://localhost:3001/user',{formData})

          const success = response.status === 200
          if (success)
            {
                navigate('/dash')
            }
        }catch(err){
            console.log(err)
        }
    }
    
    const handleChange = (event) => {
        // console.log(event)
        const value = event.target.value
        const name = event.target.name
        // console.log(value, name)
        
        setFormData((prevState) => ({
            ...prevState, 
            [name] : value
        }))
    }
    console.log("formdata", formData);
    console.log("user", user)
    return (
        <>
            {/* nav component. */}
            <Nav mobile={false}
            setShowAuth={() => {}}
            showAuth={false}
            />

            {/* container/formatting */}
            <div className='container'>
                <div className='row'>
                    {/* col to make the entire form vertical. */}
                    <div className='col'>

                        {/* header */}
                        <h2>build profile</h2>

                        {/* start of form. */}
                        <form onSubmit={handleSubmit}>

                            {/* profile pic component. */}
                            <ProfilePic userId={userId}/>

                            {/* <input
                            type='url'
                            name='imageUrl'
                            id='imageUrl'
                            onChange={handleChange}
                            required={true}
                            /> */}
                            {/* <div className='photoContainer'>
                                <img src={formData.imageUrl} alt='profile pic'/>
                            </div> */}

                            {/* username. */}
                            <div className='form-group'>
                                <label htmlFor='username'>username</label>
                                <input
                                    id='username'
                                    type='text'
                                    name='username'
                                    className='form-control'
                                    placeholder='username'
                                    required={true}
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            {/* my anime list username. */}
                            <div className='form-group'>
                                <label htmlFor='malUsername'>MYANIMELIST username</label>
                                <input
                                    id='malUsername'
                                    type='text'
                                    name='malUsername'
                                    className='form-control'
                                    placeholder='myanimelist username'
                                    required={true}
                                    value={formData.malUsername}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* birthday. */}
                            <div className='row'>

                                <label>birthday 🎈🦂</label>

                                <div className='col'>
                                    <input
                                        id='bdayMo'
                                        type='number'
                                        name='bdayMo'
                                        className='form-control'
                                        placeholder='mm'
                                        required={true}
                                        value={formData.bdayMo}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='col'>
                                    <input
                                        id='bdayDay'
                                        type='number'
                                        name='bdayDay'
                                        className='form-control'
                                        placeholder='dd'
                                        required={true}
                                        value={formData.bdayDay}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='col'>
                                    <input
                                        id='bdayYear'
                                        type='number'
                                        name='bdayYear'
                                        className='form-control'
                                        placeholder='yyyy'
                                        required={true}
                                        value={formData.bdayYear}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                            {/* about section. */}
                            <div className='form-group'>
                                <label htmlFor='bio'>about me</label>
                                <textarea
                                    id='bio'
                                    name='bio'
                                    placeholder='opinions on studio ghibli?'
                                    className='form-control'
                                    rows='6'
                                    style={styles.txtAreaResize}
                                    required={true}
                                    value={formData.bio}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* SUBMIT FORM */}
                            <input type='submit' className='' value='save'/>

                        </form>
                    </div>
                </div>
            </div>
        </>
    ) 
}

export default Signup;