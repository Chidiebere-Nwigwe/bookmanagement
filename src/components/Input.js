const Input = ({label,typeName, name, value, onChange}) => {
    return ( 
        <div>
        <label htmlFor={name}>{label}:</label>
        <br />
        <input type={typeName}id={name} name={name} value={value} onChange={onChange}/>
        </div>
     );
}
 
export default Input;