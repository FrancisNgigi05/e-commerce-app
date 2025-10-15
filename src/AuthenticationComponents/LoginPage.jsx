import React, {useState} from "react";
import { API_URL } from "../api";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../CartContextComponent/CartContext";


function Loginpage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const {setLoggedInUser} = useCart();

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`${API_URL}/users`)
            .then((r) => r.json())
            .then((users) => {
                const user = users.find((u) => u.username === formData.username && u.password === formData.password);
                if (user)  {
                    fetch(`${API_URL}/users/${user.id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({active: "active"})
                    })
                        .then((r) => r.json())
                        .then((updatedUser) => {
                            alert(`Welcome back, ${updatedUser.username}`);
                            localStorage.setItem("user", JSON.stringify(updatedUser));
                            setLoggedInUser(updatedUser);
                            if (updatedUser.role === 'admin') {
                                navigate('/admin');
                            } else {
                                navigate('/');
                            }
                        })
                }
                else {
                    alert("Invalid username or password");
                }
            })
            .catch((err) => console.error("Error loggin in:", err))
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
            <div className='outer-frame-signup' >
                <div className='signup-form'>
                    <form action="" className='inner-form' onSubmit={handleSubmit}>
                        <h2 style={{alignSelf: "center"}}>Login</h2>
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
                        <button className='signup-btn'>Login</button>
                        <Link to='/signup' style={{fontSize: "1.5vh", alignSelf: 'center'}}>Create an account</Link>
                    </form>

                </div>
            </div>
        )
}

export default Loginpage
