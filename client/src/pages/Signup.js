import { useState } from 'react';
import Nav from '../components/Nav';
import ProfilePic from '../components/uploadPic';
import '../styles/signup.css';

const styles = {
    txtAreaResize: {
        resize: 'none'
    }
};

const Signup = () => {
    
    const [formData, setFormData] = useState({
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
    console.log(formData);
    
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
                                    value={formData.userName}
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
                                    value={formData.malUserName}
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
                                        value={formData.dobDay}
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
                                        value={formData.dobMonth}
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
                                        value={formData.dobYear}
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