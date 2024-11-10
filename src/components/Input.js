import styles from './HomePage.module.css'
const Input = ({label,typeName, name, value, onChange}) => {
    return ( 
        <div className={styles.inputDiv}>
        <label htmlFor={name} className={styles.label}>{label}:</label>
        <br />
        <input className={styles.input} type={typeName}id={name} name={name} value={value} onChange={onChange}/>
        </div>
     );
}
 
export default Input;