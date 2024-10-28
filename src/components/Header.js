import styles from "./HomePage.module.css";
const Header = (props) => {
    return ( 
        <header className={styles.header}>
        <h1>{props.children}</h1>
        {/* <p className={styles.p}>Login as User or Administrator</p> */}
        </header>
     );
}
 
export default Header;