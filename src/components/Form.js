import Input from "./Input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import Footer from "./Footer";

const Form = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [highlighted, setHighlighted] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:7000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Handle login failure
        const data = await response.json();
        setError(data.message || "Login failed");
        return;
      }
      const data = await response.json();
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/administrator");

      setError("");
    } catch (err) {
      console.error("Login failed", err);
      setError("An error occurred while logging in");
    }
  };

  useEffect(() => {
    document.body.style.backgroundImage = "url(./libary2.jpg)";
    document.body.style.backgroundSize = "cover"; // Optional, to make sure the background covers the entire screen
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundColor = "#50defb";

    return () => {
      return () => {
        document.body.style.backgroundImage = "";
        document.body.style.backgroundSize = "";
        document.body.style.backgroundRepeat = "";
        document.body.style.backgroundPosition = "";
        document.body.style.margin = "";
        document.body.style.padding = "";
      };
    };
  }, []);

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

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  return (
    <div>
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
        <div className="password_andEye">
          <Input
            label="Password"
            typeName={passwordVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
          ></Input>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={styles.passwordToggleButton}
          >
            {passwordVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 16 16"
              >
                <path
                  fill="#3743dc"
                  d="m10.12 10.827l4.026 4.027a.5.5 0 0 0 .708-.708l-13-13a.5.5 0 1 0-.708.708l3.23 3.23A6 6 0 0 0 3.2 6.182a6.7 6.7 0 0 0-1.117 1.982c-.021.061-.047.145-.047.145l-.018.062s-.076.497.355.611a.5.5 0 0 0 .611-.355l.001-.003l.008-.025l.035-.109a5.7 5.7 0 0 1 .945-1.674a5 5 0 0 1 1.124-1.014L6.675 7.38a2.5 2.5 0 1 0 3.446 3.446m-.74-.74A1.5 1.5 0 1 1 7.413 8.12zM6.32 4.2l.854.854Q7.564 5 8 5c2.044 0 3.286.912 4.028 1.817a5.7 5.7 0 0 1 .945 1.674q.025.073.035.109l.008.025v.003l.001.001a.5.5 0 0 0 .966-.257v-.003l-.001-.004l-.004-.013a2 2 0 0 0-.06-.187a6.7 6.7 0 0 0-1.117-1.982C11.905 5.089 10.396 4 8.002 4c-.618 0-1.177.072-1.681.199"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="#3743dc"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                >
                  <path d="M3 13c3.6-8 14.4-8 18 0" />
                  <path fill="#3743dc" d="M12 17a3 3 0 1 1 0-6a3 3 0 0 1 0 6" />
                </g>
              </svg>
            )}
          </button>
        </div>
        <div className={styles.buttonForFormDiv}>
          <button className={styles.buttonForForm} id={styles.loginBtn}>
            Login
          </button>
          <div align="center">
            <button className={styles.buttonForForm}>
              <a href="/" className={styles.buttonForForm}>
                Go Back
              </a>
            </button>
          </div>
        </div>
        <br />
        {/* <Button >Login</Button> */}
        {error && (
          <div className="alert">
            {" "}
            <p
              className={styles.errorMessage}
              style={{ fontSize: "larger", color: "Red" }}
            >
              {error}
            </p>{" "}
          </div>
        )}
      </form>
      <Footer highlighted={highlighted} />
    </div>
  );
};

export default Form;
