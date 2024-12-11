import styles from "./HomePage.module.css";
const Header = (props) => {
  return (
    <header className={styles.header}>
      <h1>{props.children}</h1>
    </header>
  );
};

export default Header;
