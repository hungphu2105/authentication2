import axios from 'axios';
import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { sendAccessToken } from '../../services/Api.jsx'
import AuthService from '../../services/AuthService.jsx';
import '../../App.css'


function Home() {
  const navigate  = useNavigate();
  const { state } = useLocation();
  const [responseMessage, setResponseMessage] = useState('');
  const [token, setToken] = useState(state.data.token);
  const [count, setCount] = useState(1)
  const [isTesting, setIsTesting] = useState(false);
  const [isLogouting, setIsLogouting] = useState(false);

  const handleTest = async (e) => {
    e.preventDefault();
    if (isTesting) {
      return;
    }
    try {
      setIsTesting(true);
      const response = await sendAccessToken(token);
      setResponseMessage(`API Response: ${response.data.message} ${count}`);
      setCount((count) => count + 1)
    } catch (error) {
      try{
        const response = await axios.post('https://auth-server-fmp.vercel.app/auth/refresh-token', {}, {withCredentials: true});
        setToken(response.data.data.token);
        const response1 = await sendAccessToken(response.data.data.token);
        setResponseMessage(`API Response: ${response1.data.message} ${count}`);
        setCount((count) => count + 1)
      } catch (error){
        if(error.response.data.success===false){
          alert('RefreshToken hết hạn')
          setToken('');
          AuthService.logout();
          navigate('/');
        }
      } 
    } finally {
      setIsTesting(false);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    if (isLogouting) {
      return;
    }
    try {
      setIsLogouting(true);
      const response = await axios.post('https://auth-server-fmp.vercel.app/auth/logout', token);
      //alert("Đăng xuất thành công");
      if(response.data.success){
        setToken('');
        AuthService.logout();
        navigate('/');
      }
    } catch (error) {
      alert("Đăng xuất thất bại");
      //console.log('Đăng xuất thất bại');             
    }finally {
      setIsLogouting(false);
    }
  };

  return <div className='card'>
    <div style={{padding:20}}>
        <div className="heading1">Home</div>
    </div>
    <hr/>
    <div style={{padding:20}}>
      <p><button className='btn' onClick={handleTest} disabled={isTesting}>Test api</button></p>
      <div>{responseMessage}</div>
      <br />
      <button className='btn_logout' onClick={handleLogout} disabled={isLogouting}>Đăng xuất</button>
    </div>
  </div>;
}

export default Home;
