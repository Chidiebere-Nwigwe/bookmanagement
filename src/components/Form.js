import Input from "./Input";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css'
import Footer from "./Footer";

const Form = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [highlighted, setHighlighted] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
    const response = await fetch('http://localhost:7000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)    
    });

    if (!response.ok) {    // Handle login failure
      const data = await response.json();
      setError(data.message || 'Login failed');
      return;
    }
    const data = await response.json();
    setToken(data.token);  
    localStorage.setItem('token', data.token);
    navigate('/administrator');

    setError('');
  } catch (err) {
    console.error('Login failed', err);
    setError('An error occurred while logging in');
  }

  }

  useEffect(()=>{
     document.body.style.backgroundImage = 'url(./backgroundimg.png)';
     document.body.style.backgroundSize = 'cover'; // Optional, to make sure the background covers the entire screen
     document.body.style.backgroundRepeat = 'no-repeat'; 
     document.body.style.backgroundColor = '#50defb';


    return () =>{
      return () => {
        document.body.style.backgroundImage = '';
        document.body.style.backgroundSize = '';
        document.body.style.backgroundRepeat = '';
        document.body.style.backgroundPosition = '';
        document.body.style.margin = '';
        document.body.style.padding = '';
    };
    }
  }, [])

  function handleReset() {
    setFormData({
      username: "",
      password: "",
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData, // use spread operator to update variable when using this method.
      [name]: value,
    }));
  }
  return (
    <div >
    <form onSubmit={handleSubmit} className={styles.form}>
       {/* <form> */}
      <Input
        label="User Name"
        typeName="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      ></Input>
      <br />
      <Input
        label="Password"
        typeName="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      ></Input>
      <button className={styles.buttonForForm}>Login</button>
      {/* <Button >Login</Button> */}
      {error && <div className="alert"> <p className={styles.errorMessage} style={{fontSize: 'larger', color:'Red'}}>{error}</p> </div>}
    </form>
    <Footer highlighted={highlighted}/>
    </div>

  );
};

export default Form;
