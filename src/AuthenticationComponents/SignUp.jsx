import React, { useState } from 'react'
import './SignUp.css'
import { API_URL } from '../api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState ({
        username: '',
        password: '',  
    })

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'appliction/json',
            },
            body: JSON.stringify({
                ...formData, 
                role: 'customer'
            })
        })
            .then((r) => r.json())
            .then((data) => {
                console.log('User created:', data);
                setFormData({username: '', password: ''});
                navigate('/login');
            })
            .catch((err) => {
                console.error('Error:', err);
                alert('Error signing up');
            });
    }
  
    return (
        <div className='outer-frame-signup' >
            <div className='signup-form'>
                <form action="" className='inner-form' onSubmit={handleSubmit}>
                    <h2 style={{alignSelf: "center"}}>Sign Up</h2>
                    <input
                        className='signup-input'
                        name='username'
                        type="text"
                        placeholder='username'
                        required
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input
                        name='password'
                        className='signup-input'
                        type="password" 
                        placeholder='password'
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button className='signup-btn'>Sign up</button>
                    <Link to='/login' style={{fontSize: "1.5vh", alignSelf: 'center'}}>Already have an account?</Link>
                </form>

            </div>
        </div>
    )
}

export default SignUp
