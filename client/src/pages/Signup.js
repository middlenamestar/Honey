import { useState } from 'react';
import Nav from '../components/Nav';
import ProfilePic from '../components/uploadPic';

const Signup = () => {
    
    const [formData, setFormData] = useState({
        userName: '',
        malUserName: '',
        dobDay: '',
        dobMonth: '',
        dobYear: '',
        bio: '',
        email: '',
        imageUrl: '',
        matches: []
    })
    
    const handleSubmit = () => {
        console.log('submit')
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
    console.log(formData)
    
    return (
        <>
        <Nav mobile={false}
        setShowAuth={() => {}}
        showAuth={false}
        />
            <div className='signup'>
                <h2>Create Account</h2>
                
                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor='userName'>User Name </label>
                        <input
                        id='userName'
                        type='text'
                        name='userName'
                        placeholder='User Name'
                        required={true}
                        value={formData.userName}
                        onChange={handleChange}
                        />
                        
                        <label htmlFor='malUserName'>MyAnimeList User Name </label>
                        <input
                        id='malUserName'
                        type='text'
                        name='malUserName'
                        placeholder='MyAnimeList User Name'
                        required={true}
                        value={formData.malUserName}
                        onChange={handleChange}
                        /> 
                                                                                          
                        <label>Birthday </label>
                        <div className='birthdayInputContainer'>
                        <input
                        id='dobDay'
                        type='number'
                        name='dobDay'
                        placeholder='DD'
                        required={true}
                        value={formData.dobDay}
                        onChange={handleChange}
                        />   
                        <input
                        id='dobMonth'
                        type='number'
                        name='dobMonth'
                        placeholder='MM'
                        required={true}
                        value={formData.dobMonth}
                        onChange={handleChange}
                        />     
                             
                        <input
                        id='dobYear'
                        type='number'
                        name='dobYear'
                        placeholder='YYYY'
                        required={true}
                        value={formData.dobYear}
                        onChange={handleChange}
                        />
                        </div>
                        
                        <label htmlFor='bio'>About Me </label>
                        <input
                        id='bio'
                        type='text'
                        name='bio'
                        placeholder='Tell us about yourself!'
                        required={true}
                        value={formData.bio}
                        onChange={handleChange}
                        />
                        <input  type='submit' />
                    </section> 
                          
                    <section>                 
                        <p>PROFILE PIX.</p>
                        <ProfilePic/>
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
                    </section>
                </form>
            </div>
        </>
    ) 
}

export default Signup;