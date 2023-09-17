class AuthService {
    static isLoggedIn() {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
  
    static login() {
      localStorage.setItem('isLoggedIn', 'true');
    }
  
    static logout() {
      localStorage.removeItem('isLoggedIn');
    }
  }
  
  export default AuthService;