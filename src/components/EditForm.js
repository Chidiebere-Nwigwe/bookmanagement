import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // useNavigate replaces useHistory in v6
import styles from "./HomePage.module.css";

const EditForm = () => {
  const { id } = useParams(); // Get the book id from the URL
  const navigate = useNavigate(); // For redirecting after the form is submitted
  const token = localStorage.getItem("token"); //get token stored on localStorage
  const [notification, setNotification] = useState("");

  const [book, setBook] = useState({
    //initialState
    title: "",
    author: "",
    description: "",
    publicationDate: "",
    coverImage: "",
  });

  let isAuthenticated = false; // for checking token expiration
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

  useEffect(() => {
    const fetchBook = async () => {
      // Fetch book data by ID to autopopulate fields initially
      try {
        const response = await fetch(`http://localhost:7000/books/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBook();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update the book details
    try {
      const response = await fetch(`http://localhost:7000/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //token to confirm authorization
        },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        // Redirect to the administrator page after successful update
        setNotification("Book updated successfully!");
        setTimeout(() => navigate("/administrator"), 2000);
        // navigate(`/administrator`);
      } else {
        alert("Failed to update book details");
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className={styles.editPage}>
      {isAuthenticated ? (
        <>
          <h1>Edit Book</h1>
          {notification && (
            <div className={styles.notification}>{notification}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={book.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="author">Author:</label>
              <input
                type="text"
                id="author"
                name="author"
                value={book.author}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={book.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="publicationDate">Publication Date:</label>
              <input
                type="date"
                id="publicationDate"
                name="publicationDate"
                value={book.publicationDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="coverImage">Cover Image URL:</label>
              <input
                type="url"
                id="coverImage"
                name="coverImage"
                value={book.coverImage}
                onChange={handleChange}
                required
              />
            </div>
            <button className={styles.submitBtn} type="submit">
              Save Changes
            </button>
            <button
              className={styles.cancelBtn}
              type="button"
              onClick={() => navigate("/administrator")}
            >
              Cancel
            </button>
          </form>
        </>
      ) : (
        ///if user is not authenticated, they are prompted to login
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

export default EditForm;
