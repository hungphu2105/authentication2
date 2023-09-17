import axios from 'axios';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate  } from 'react-router-dom';
import '../../App.css'
import AuthService from '../../services/AuthService.jsx';

function Login() {
    const navigate  = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) {
            return;
        }
        try {
            setIsSubmitting(true);
            const response = await axios.post('https://auth-server-fmp.vercel.app/auth/login', formData, {withCredentials: true});
            //console.log('Đăng nhập thành công');
            //alert('Đăng nhập thành công');
            AuthService.login();
            if(response.data.success)
            {navigate('/home', { state: { data: response.data.data  } });}
        } catch (error) {
            alert("Đăng nhập thất bại");
            //console.error('Đăng nhập thất bại', error);
             
        }finally {
            setIsSubmitting(false);
        }
    };

    return <div className='card'>
                <div style={{padding:20}}>
                    <div className="heading1">Log In</div>
                    <br />
                    <>
                        <div>
                        <label htmlFor="email">Email:</label>
                        </div>
                        <p>
                            <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            />
                        </p>

                        <div>
                        <label htmlFor="password">Password:</label>
                        </div>
                        <p>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        </p>
                        <p><button className='btn' onClick={handleSubmit} disabled={isSubmitting}>Đăng nhập</button></p>
                    </>
                </div>
                <hr/>
                <div style={{paddingLeft:20}}>
                    <div>New use?</div>
                    <p><Link to="/signup" className='btn'>Sign Up</Link></p>
                </div>
            </div>;
}

export default Login;