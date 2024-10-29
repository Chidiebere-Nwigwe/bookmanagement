import styles from './HomePage.module.css'
import { useNavigate } from 'react-router-dom';
const Button = ({onClick, children}) => {
    const navigate = useNavigate();

    function handleClick(){
        if(children == "Administrator" ){
            navigate('/login')
        }
        if(children == "User" ){
            navigate('/user');
        }
        if(children == "Login" ){
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