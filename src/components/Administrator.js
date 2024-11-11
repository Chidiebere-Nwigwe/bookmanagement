import Header from "./Header";
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from "react-router-dom";

const Administrator = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let isAuthenicated = false;

  if(token){
    try{
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if(decodedToken.exp < currentTime){
        localStorage.removeItem('token');
      }
      else{
        isAuthenicated = true;
      }
    }
    catch(error){
      console.error('Invalid token', error);
    }
  }

  function handleLogOut(){
    localStorage.removeItem('token')
    navigate('/');
  }
  
  return(
    <div>
      {isAuthenicated ? 
      (
       <div>
                <Header>ADMIN WILL BE WORKED ON BY DUMEBI AND KENE</Header>
                <button onClick={handleLogOut}>Log Out</button>
      </div>
      ) : 
      (
        <Link to="/login">Login Page</Link>
      )}
    </div>
  )
};
export default Administrator;
