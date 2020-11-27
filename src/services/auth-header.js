export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.payload[0].jwtToken) {
      return { Authorization: user.payload[0].jwtToken };
    } else {
      return {};
    }
  }
