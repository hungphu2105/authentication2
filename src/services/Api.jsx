import axios from 'axios';

const sendAccessToken = (accessToken) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  
  return axios.post('https://auth-server-fmp.vercel.app/test', {}, { headers });
};

export { sendAccessToken };