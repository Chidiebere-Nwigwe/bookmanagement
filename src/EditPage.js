import "./components/HomePage.module.css"
import "./App.css"
import React, { useReducer, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
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
    <div className="editPage">
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
 
          <button className="submit_Btn" type="submit">Save Changes</button>
          <button className="cancle_Btn" type="button" onClick={() => navigate('/administrator')}>Cancel</button>
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
 