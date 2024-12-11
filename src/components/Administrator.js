import ArrowDown from "./ArrowDown";
import ArrowUp from "./ArrowUp";
import styles from "./HomePage.module.css";
import "../App.css";
import Footer from "./Footer";
import edit from "./edit.png";
import deleteIcon from "./delete.png";
import { useState, useEffect, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

const Administrator = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const initialState = {
    title: "",
    description: "",
    publicationDate: "",
    author: "",
    coverImage: "", // For the image file
  };

  function reducer(state, action) {
    console.log(action.type);
    switch (action.type) {
      case "updateField":
        return {
          ...state,
          [action.field]: action.value,
        };
      case "reset":
        return initialState;
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (e) => {
    dispatch({
      type: "updateField",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const [notification, setNotification] = useState("");

  const GetBooks = async () => {
    try {
      const response = await fetch("http://localhost:7000/books", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "CANNOT GET BOOKS");
        return;
      }

      const data = await response.json();
      setBooks(data);
      setError("");
    } catch (err) {
      console.error("failed to get books", err);
      setError("An error occurred while getting books");
    }
  };

  const AddBook = async (event) => {
    try {
      // Send the data as JSON
      const response = await fetch("http://localhost:7000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token
        },
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        const data = await response.json();
        setNotification(`Failed to add book: ${data.message}`);
        return;
      }

      setNotification("Book added successfully!");
      setShowAddForm(false); // Hide the form
      GetBooks(); // Refresh the list of books
    } catch (err) {
      console.error("Failed to add book", err);
      setNotification("An error occurred while adding the book");
    }
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let isAuthenticated = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
      } else {
        isAuthenticated = true;
      }
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setNotification("You must be logged in to delete books.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:7000/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        setNotification(`Failed to delete book: ${data.message}`);
        return;
      }

      setTimeout(setNotification("Book deleted successfully."), 3000);
      //GetBooks(); // Refresh the list of books
      window.location.reload();
    } catch (err) {
      console.error("Failed to delete book", err);
      setNotification("An error occurred while deleting the book.");
    }
  };

  useEffect(() => {
    GetBooks();
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <div className={styles.background}>
          <ArrowUp />
          <ArrowDown />
          {showAddForm && (
            <div className="AddBookFormDiv">
              {notification && (
                <div className="alert">
                  {" "}
                  <div className="notification">{notification}</div>{" "}
                </div>
              )}
              <form className="AddBookForm" onSubmit={AddBook}>
                <h3>Add New Book</h3>
                <label htmlFor="title">
                  {" "}
                  Title:
                  <input
                    name="title"
                    id="title"
                    type="text"
                    placeholder="Title"
                    value={state.title}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label htmlFor="author">
                  {" "}
                  Author:
                  <input
                    name="author"
                    id="author"
                    type="text"
                    placeholder="Author"
                    value={state.author}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label htmlFor="description">
                  {" "}
                  Description:
                  <br />
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={state.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </label>
                <label htmlFor="publicationDate">
                  {" "}
                  Publication Date:
                  <input
                    type="date"
                    id="publicationDate"
                    name="publicationDate"
                    placeholder="publicationDate"
                    value={state.publicationDate}
                    onChange={handleChange}
                    required
                  ></input>
                </label>
                <label htmlFor="coverImage">
                  {" "}
                  Cover Image:
                  <input
                    name="coverImage"
                    id="coverImage"
                    type="text"
                    value={state.coverImage}
                    placeholder="Please Input Image URL"
                    onChange={handleChange}
                    required
                  />
                </label>
                <div className="AddBookFormButtons">
                  <button type="submit">Submit</button>
                  <button type="button" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
          <div className={`Admin_Div ${showAddForm ? "blurred" : ""}`}>
            <button className="LogOut_btn" onClick={handleLogOut}>
              Log Out
            </button>
            <button className="Add_btn" onClick={() => setShowAddForm(true)}>
              Add
            </button>
            <button className="Add_btn" onClick={() => navigate("/user")}>
              View As User
            </button>
            {notification && (
              <div className="alert">
                {" "}
                <div className="notification">{notification}</div>{" "}
              </div>
            )}
            <div className="header ">
              <h1>Welcome</h1>
              <h3>All Your Books</h3>
            </div>
            <div className="AdminBookContainer">
              {books.map((book) => (
                <div key={book.id} className="AdminBookContainer">
                  <div className="card_Div">
                    <Link className="Admin_Link">
                      <div className="Admin_card">
                        <img
                          className="bookImg"
                          src={book.coverImage}
                          alt="Product Image"
                        />
                        <h3 className="bookTitle">{book.title}</h3>
                      </div>
                      <div className="iconBox">
                        {/* <img className="icon" src={edit} alt="edit button" onClick={() => handleEditClick(book)}  /> */}
                        <Link to={`/edit/${book.id}`}>
                          <img className="icon" src={edit} alt="edit button" />
                        </Link>
                        <img
                          className="icon"
                          src={deleteIcon}
                          alt="delete button"
                          onClick={() => handleDelete(book.id)}
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <Footer />
          </div>
        </div>
      ) : (
        <Link
          to="/login"
          style={{
            textAlign: "center",
            fontSize: "xx-large",
            color: "rgb(58, 0, 0)",
            backgroundColor: "rgba(245, 245, 245, 0.568)",
            width: "20%",
            padding: "2%",
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "5px",
          }}
        >
          Go To Login Page
        </Link>
      )}
    </div>
  );
};

export default Administrator;
