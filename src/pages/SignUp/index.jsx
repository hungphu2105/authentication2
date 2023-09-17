import axios from 'axios';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate  } from 'react-router-dom';
import '../../App.css'

function SignUp() {

    const navigate  = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        password: '',
    });
    
    const [emailRequire, setEmailrequire] = useState('');
    const [fullNameRequire, setFullNameRequire] = useState('');
    const [pwRequire, setPwRequire] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState('');
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
        if (formData.email === ''){
            setEmailrequire('Nhập email!')
            return;
        }
        else{
            setEmailrequire('')
        }
        if (formData.fullName === ''){
            setFullNameRequire('Nhập họ và tên!')
            return;
        }
        else{
            setFullNameRequire('')
        }
        if (formData.password === ''){
            setPwRequire('Nhập mật khẩu!')
            return;
        }
        else{
            setPwRequire('')
        }
        if (formData.password !== formData.confirmPassword) {
            setPasswordMismatch('Mật khẩu và xác nhận mật khẩu không khớp!');
            return;
        }
        else{
            setPasswordMismatch('')
        }
        try {
            setIsSubmitting(true);
            await axios.post('https://auth-server-fmp.vercel.app/auth/register', formData);
            //console.log('Đăng ký thành công', response.data);
            alert("Đăng ký thành công");
            navigate('/');
        } catch (error) {
            alert("Đăng ký thất bại");
            //console.error('Đăng ký thất bại', error);
        }finally {
            setIsSubmitting(false);
        }
    };
    
    return <div className='card'>
                <div style={{padding:20}}>
                    <div className="heading1" style={{paddingBottom:25}}>Sign Up</div>
                    <>
                        
                        <label htmlFor="email">Email:</label>
                        <p>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </p>

                        <label htmlFor="fullName">Fullname:</label>
                        <p>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </p>

                        <label htmlFor="password">Password:</label>
                        <p>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </p>

                        <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
                        <p>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </p>

                        {emailRequire ? (
                            <div className="requireData">{emailRequire}</div>
                        ) : (
                            <p></p>
                        )}
                        {fullNameRequire ? (
                            <div className="requireData">{fullNameRequire}</div>
                        ) : (
                            <p></p>
                        )}
                        {pwRequire ? (
                            <div className="requireData">{pwRequire}</div>
                        ) : (
                            <p></p>
                        )}
                        {passwordMismatch ? (
                            <div className="requireData">{passwordMismatch}</div>
                        ) : (
                            <p></p>
                        )}
                            
                        <div><button className='btn' onClick={handleSubmit} disabled={isSubmitting}>Đăng ký</button></div>
                    </>
                </div>
                <hr/>
                <div style={{paddingLeft:20}}>
                    <p><Link to="/" className='btn'>Log In</Link></p>
                </div>
            </div>;
}

export default SignUp;