import Header from "./Header";
import Button from "./Button";
import Footer from "./Footer";
import styles from "./HomePage.module.css"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


const HomePage = () => {

    const location = useLocation();

    useEffect(()=>{
      document.body.style.backgroundColor = 'white';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundPosition = '';
      document.body.style.height = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
   }, [])

    useEffect(() => {
      // Check the current route and set background image accordingly
      if (location.pathname === '/administrator') {
        document.body.style.backgroundImage = 'url(./backgroundimg.png)';
      } else {
        document.body.style.backgroundImage = 'none';
      }

      return () => {
        document.body.style.backgroundImage = 'none';
      };
    }, [location]); //  whenever location changes 

    const [highlighted, setHighlighted] = useState(false)
    return ( 
        <div className={styles.body}>
        <Header>LOGIN</Header>
        
        <p>login as a user or Administrator </p>
        
        <div id="Buttons" className={styles.buttons}>
        <Button>Administrator</ Button>
        <Button>User</ Button>
        </div>
        <Footer highlighted={highlighted} />
        </div>
     );
}
 
export default HomePage;