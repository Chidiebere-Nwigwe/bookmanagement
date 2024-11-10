import Header from "./Header";
import Button from "./Button";
import Footer from "./Footer";
import styles from "./HomePage.module.css"
import { useState } from "react";

const HomePage = () => {
    const [highlighted, setHighlighted] = useState(false)
    return ( 
        <div className={styles.body}>
        <Header>LOGIN</Header>
        <div id="Buttons" className={styles.buttons}>
        <Button>Administrator</ Button>
        <Button>User</ Button>
        </div>
        <Footer highlighted={highlighted} />
        </div>
     );
}
 
export default HomePage;