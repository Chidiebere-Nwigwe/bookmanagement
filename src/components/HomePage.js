import Header from "./Header";
import Button from "./Button";
import Footer from "./Footer";
import styles from "./HomePage.module.css"

const HomePage = () => {
    return ( 
        <div className={styles.body}>
        <Header>LOGIN</Header>
        
        <p>login as a user or Administrator </p>
        
        <div id="Buttons" className={styles.buttons}>
        <Button>Administrator</ Button>
        <Button>User</ Button>
        </div>
        <Footer />
        </div>
     );
}
 
export default HomePage;