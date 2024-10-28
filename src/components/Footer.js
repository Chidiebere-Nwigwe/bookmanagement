import styles from "./HomePage.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from "@fortawesome/free-regular-svg-icons";

const Footer = () => {
    return ( 
        <footer className={styles.footers}>
            Book Management Website <span className={styles.span}>
            <FontAwesomeIcon icon={faCopyright}/>
            </span> Copyright
            </ footer>
     );
}
 
export default Footer;

