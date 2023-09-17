//Pages
import Home from '../pages/Home';
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'

const publicRoutes = [
    
    { path: '/signup', component: SignUp },
    { path: '/', component: Login },
    { path: '/home', component: Home },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
