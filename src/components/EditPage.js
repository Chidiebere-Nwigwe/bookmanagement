import "./HomePage.module.css"
import "../App.css"
import React, { useReducer, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import Header from "./Header";
import Footer from "./Footer";
// import { Link, useNavigate } from "react-router-dom";
// import { faF } from "@fortawesome/free-solid-svg-icons";


const initialState = {
    title: '',
    description: '',
    publicationDate: '',
    author: '',
    coverImage: null, // For the image file/url
}

function reducer(state, action){
    console.log(action.type)
    switch (action.type){
        case 'updateField':
            return {
                ...state,
                [action.field]:action.value
            };
        // case 'LoadData':
        //     return{
        //         ...state,
        //         ...action.payload, // fills the fform with existing Books... 
        //     };
        case 'reset':
            return initialState
        default:
            return state
    }
}
  






const EditPage = () => {
    const { id } = useParams(); //books id from url
    const navigate = useNavigate();

    const [notification, setNotification] = useState("");
    
    const [book, setBook] = useState({});
    const [error, setError] = useState('');



    const[state, dispatch] = useReducer(reducer, initialState)
    const handleChange = (e) => {
         dispatch({
            type: 'updateField',
            field: e.target.name,
            value: e.target.value
         })
      };



















  
    useEffect(() => {
      const fetchBook = async () => {
        try {
          const response = await fetch(`http://localhost:7000/books/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (!response.ok) {
            // Check if the response is JSON
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const errorMessage = isJson ? (await response.json()).message : response.statusText;
            throw new Error(errorMessage || 'Failed to fetch book details.');
          }
  
          const data = await response.json();
          setBook(data);
          setError('');
        } catch (err) {
          console.error('Error fetching book:', err);
          setError(err.message || 'An unexpected error occurred while fetching the book.');
        }
      };
  
      fetchBook();
    }, [id]); // Dependency ensures the effect re-runs if `id` changes.

    // const handleChange=(e)=>{
    //     dispatch({
    //         type:'updateField',
    //         field:e.target.name,
    //         value:e.target.name === "coverImage" 
    //         ? e.target.files[0] : e.target.value,
    //     });
    // }
    // const handleChange = (e) => {
    //     const { name, value, files } = e.target;
    //     setBook((prevBook) => ({
    //       ...prevBook,
    //       [name]: name === 'coverImage' ? files[0] : value,
    //     }));
    //   };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const updatedBook = { ...state, id };
    
    //     try {
    //       const response = await fetch(`http://localhost:7000/books/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(updatedBook),
    //       });
    
    //       if (!response.ok) throw new Error("Failed to update book.");
    //       setNotification("Book updated successfully!");
    //       navigate("/administrator");
    //     } catch (error) {
    //       console.error(error);
    //       setNotification("Failed to update book.");
    //     }
    // };
    const token = localStorage.getItem('token');
    let isAuthenticated = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
      } else {
        isAuthenticated = true;
      }
    } catch (error) {
      console.error('Invalid token', error);
    }
  }

{
    if(state.title === ''){
        console.log("nullll")
        state.title = book.title
    }
    if(state.description === ''){
        console.log("nullll")
        state.description = book.description
    }
    if(state.publicationDate === ''){
        state.publicationDate = book.publicationDate
    }
    if(state.author === ''){
        state.author = book.author
    }
    if(state.coverImage === null || state.coverImage === ''){
        state.coverImage = book.coverImage
    }
}







    const handleSubmit = async (event) => {

        if(state.title === ''){
            console.log("nullll")
            state.title = book.title
        }
        if(state.description === ''){
            console.log("nullll")
            state.description = book.description
        }
        if(state.publicationDate === ''){
            state.publicationDate = book.publicationDate
        }
        if(state.author === ''){
            state.author = book.author
        }
        if(state.coverImage === null || state.coverImage === ''){
            state.coverImage = book.coverImage
        }


        event.preventDefault();
    
        const formData = new FormData();
        formData.append('title', state.title);
        formData.append('description', state.description);
        formData.append('publicationDate', state.publicationDate);
        formData.append('author', state.author);
        if (state.coverImage) {
          formData.append('coverImage', state.coverImage);
        }


    
        try {
          const response = await fetch(`http://localhost:7000/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the token
            },
            body: JSON.stringify(state),
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update book');
          }
    
          setNotification('Book updated successfully!');
          setTimeout(() => navigate('/administrator'), 2000); // Redirect after 2 seconds
        } catch (error) {
          console.error('Error updating book:', error);
          setNotification(error.message || 'An error occurred while updating the book');
        }
      };
    
    return (
        <div>
     {isAuthenticated ? (
    <div>
        <h1>Edit Book</h1>
        {notification && <div className="notification">{notification}</div>}
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
            //   placeholder={book.title}
              value= {book.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              name="author"
              value={state.author}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={book.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Publication Date:
            <input
              type="date"
              name="publicationDate"
              value={book.publicationDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
          Cover Image:
          <input
                name="coverImage"
                  type="text"
                  value={book.coverImage}
                  
                  placeholder="Please Input Image URL"
                  // onChange={(e) => setNewBook({ ...newBook, coverImage: e.target.files[0] })}
                  onChange={handleChange}
                  required
                />
          </label>

          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => navigate('/administrator')}>Cancel</button>
        </form>

    </div>
) : (
    <div>
        <p>login</p>
    </div>
)}    
      </div>
    );
};

export default EditPage;


//********************************************************************************************* */

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const EditPage = () => {
//   const [book, setBook] = useState(null); // Book data fetched from the API
//   const [notification, setNotification] = useState('');
//   const [loading, setLoading] = useState(true); // Loading state
//   const { id } = useParams(); // Get the book ID from the URL
//   const navigate = useNavigate();

//   // Fetch the book data when the component loads
//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:7000/books/${id}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch book details');
//         }
//         const bookData = await response.json();
//         setBook(bookData); // Set the fetched data in state
//       } catch (error) {
//         console.error('Error fetching book details:', error);
//         setNotification('Error fetching book details');
//       } finally {
//         setLoading(false); // Update loading state
//       }
//     };

//     fetchBookDetails();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setBook((prevBook) => ({
//       ...prevBook,
//       [name]: name === 'coverImage' ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('title', book.title);
//     formData.append('description', book.description);
//     formData.append('publicationDate', book.publicationDate);
//     formData.append('author', book.author);
//     if (book.coverImage) {
//       formData.append('coverImage', book.coverImage);
//     }

//     try {
//       const response = await fetch(`http://localhost:7000/books/${id}`, {
//         method: 'PUT',
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to update book');
//       }

//       setNotification('Book updated successfully!');
//       setTimeout(() => navigate('/admin'), 2000); // Redirect after 2 seconds
//     } catch (error) {
//       console.error('Error updating book:', error);
//       setNotification(error.message || 'An error occurred while updating the book');
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Display a loading message while fetching data
//   }

//   if (!book) {
//     return <div>Error: Book data could not be loaded.</div>; // Error message if book is null
//   }

//   return (
//     <div>
//       <h1>Edit Book</h1>
//       {notification && <div className="notification">{notification}</div>}
//       <form onSubmit={handleSubmit}>
//         <label>
//           Title:
//           <input
//             type="text"
//             name="title"
//             value={book.title}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Author:
//           <input
//             type="text"
//             name="author"
//             value={book.author}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Description:
//           <textarea
//             name="description"
//             value={book.description}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Publication Date:
//           <input
//             type="date"
//             name="publicationDate"
//             value={book.publicationDate}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Cover Image:
//           <input
//             type="file"
//             name="coverImage"
//             accept="image/*"
//             onChange={handleChange}
//           />
//         </label>
//         <button type="submit">Save Changes</button>
//         <button type="button" onClick={() => navigate('/admin')}>Cancel</button>
//       </form>
//     </div>
//   );
// };

// export default EditPage;
