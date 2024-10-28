import Input from "./Input";
import Button from "./Button";
import { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault(); // to prevent default of form in html
    console.log(formData);
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
    <form onSubmit={handleSubmit}>
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
      <Button onClick={handleReset}>Login</Button>
    </form>
  );
};

export default Form;
