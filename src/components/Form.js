import Input from "./Input";
import Button from "./Button";
import { useState } from "react";

//i added this
import { useNavigate } from "react-router-dom";


const Form = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault(); // to prevent default of form in html
    console.log(formData);

                    // --i added the below---
    //makes sure ythe user inputes the right userName and password...
    if (formData.userName === "Admin" && formData.password === "Admin1234") {
      navigate("/administrator");
    } else {
      alert("Invalid username or password");
    }//what i added end here
  }

  function handleReset() {
    setFormData({
      userName: "",
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
    <form onSubmit={handleSubmit} align='center'>
      <Input
        label="User Name"
        typeName="text"
        name="userName"
        value={formData.userName}
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
      <br/>
      <div align='left'>
      <Button onClick={handleReset}>Login</Button>
      </div>
    </form>
  );
};

export default Form;
