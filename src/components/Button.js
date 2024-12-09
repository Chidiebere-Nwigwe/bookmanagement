import styles from './HomePage.module.css'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const Button = ({onClick, children}) => {
    const navigate = useNavigate();
    function handleClick(){
        if(children == "Administrator" ){
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
            if(isAuthenicated == true) {navigate('/administrator');}
            else {
                navigate('/login');
            }
        }
        if(children == "User" ){
            navigate('/user');
        }
        if(children == "Login" ){
            console.log("lofinn")
           // {onClick}
            //'navigate('/administrator');
        }


    }
    return ( 
        <>
            <div>
            <button onClick={handleClick} className={styles.button}>
            {children}
            </button>
            </div>
        </>
     );
}
 
export default Button;