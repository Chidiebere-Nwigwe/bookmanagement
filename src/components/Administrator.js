
// import Header from "./Header";
// import styles from './HomePage.module.css'
// import'../App.css';
// import Footer from "./Footer";
// import edit from "./edit.png";
// import deleteIcon from "./delete.png";
// import {useState, useEffect} from "react";
// import { jwtDecode } from 'jwt-decode';
// import { Link, useNavigate } from "react-router-dom";

// const Administrator = () => {

//   const [books, setBooks] = useState([]);
//   const [error, setError] = useState([]);

//   // State to hold new book data and modal for the pop up
 


 
//   const GetBooks = async () =>{
//     try{
//       const response = await fetch('http://localhost:7000/books',{
//         method: 'GET',
//         headers: {
//           'Content-Type':'application/json',
//         }
//     });
 
//         if(!response.ok)
//         {
//           const data = await response.json()
//           setError(data.message||'CANNOT GET BOOKS');
//           return;
//         }
//         const data = await response.json();
//         console.log(data);
//         setBooks(data);
//         setError('');
//       }
//         catch(err)
//         {
//           console.error('failed to get books', err);
//           setError('An error occured while getting books')
//         }
     
//     }


//     // Add book async function...






//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');
//   let isAuthenicated = false;

//   if(token){
//     try{
//       const decodedToken = jwtDecode(token);
//       const currentTime = Date.now() / 1000;
//       if(decodedToken.exp < currentTime){
//         localStorage.removeItem('token');
//       }
//       else{
//         isAuthenicated = true;
//       }
//     }
//     catch(error){
//       console.error('Invalid token', error);
//     }
//   }

//   function handleLogOut(){
//     localStorage.removeItem('token')
//     navigate('/');
//   }

//   // function handleAddBook(){

//   // }

//   useEffect(()=>{
//     GetBooks();
// }, [])
  
//   return(
//     // <div>
//     //   {isAuthenicated ? 
//     //   (
//     //    <div className={styles.background}>
//     //             <Header>ADMIN WILL BE WORKED ON BY DUMEBI AND KENE</Header>
//     //             <button onClick={handleLogOut}>Log Out</button>
//     //   </div>
//     //   ) : 
//     //   (
//     //     <Link to="/login">Login Page</Link>
//     //   )}
//     // </div>
//     <div>
//       {isAuthenicated?
//       (
//         <div className={styles.background}>
//           <div className="Admin_Div">
//             <button className="LogOut_btn" onClick={handleLogOut}>Log Out</button>
            
//             <button className="Add_btn" >Add</button>
            
//             <div className="header">
//                <h1>Welcome</h1>
//                <h3>All Your Books</h3>
//             </div>
//             <div className ="AdminBookContainer">
//               {
//               books.map((book) => (
//                 <div key={book.id} className="AdminBookContainer">
//                   <div className="card_Div"> 
//                   <Link className="Admin_Link">
//                     <div className="Admin_card">
//                       <img className="bookImg" src={book.coverImage} alt="Product Image"/>
//                       <h3 className="bookTitle">{book.title}</h3>
//                     </div>
                  
//                     <div className="iconBox">
//                       <img className="icon" src = {edit} alt="edit button"/>
//                       <img className="icon" src={deleteIcon} alt="delete button"/>
//                     </div>
//                   </Link>
//                   </div>
//                 </div>
//               ))
//               }
//             </div>

//     <Footer />
//         </div>
//       </div>
//       ) :
//       (
//         <Link to="/login">Back To Login Page</Link>
//       )}
//     </div>
//   )
// };
// export default Administrator;

// ************************************************************************

// import Header from "./Header";
// import styles from './HomePage.module.css';
// import '../App.css';
// import Footer from "./Footer";
// import edit from "./edit.png";
// import deleteIcon from "./delete.png";
// import { useState, useEffect, useReducer } from "react";
// import { jwtDecode } from 'jwt-decode';
// import { Link, useNavigate } from "react-router-dom";

// const Administrator = () => {
//   const [books, setBooks] = useState([]);
//   const [error, setError] = useState('');
//   const [showAddForm, setShowAddForm] = useState(false);
//   // const [newBook, setNewBook] = useState({
//   //   title: '',
//   //   description: '',
//   //   publicationDate: '',
//   //   author: '',
//   //   coverImage: null, // For the image file
//   // });

//   const initialState = {
//     title: '',
//     description: '',
//     publicationDate: '',
//     author: '',
//     coverImage: '', // For the image file
// }

// function reducer(state, action){
//   console.log(action.type)
//   switch (action.type){
//       case 'updateField':
//           return {
//               ...state,
//               [action.field]:action.value
//           }
//       case 'reset':
//           return initialState
//       default:
//           return state
//   }
// }



// const [state, dispatch] = useReducer(reducer, initialState)
// const handleChange=(e)=>{
//     dispatch({
//         type:'updateField',
//         field:e.target.name,
//         value:e.target.value
//     })
// }


//   const [notification, setNotification] = useState('');

//   const GetBooks = async () => {
//     try {
//       const response = await fetch('http://localhost:7000/books', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         setError(data.message || 'CANNOT GET BOOKS');
//         return;
//       }

//       const data = await response.json();
//       setBooks(data);
//       setError('');
//     } catch (err) {
//       console.error('failed to get books', err);
//       setError('An error occurred while getting books');
//     }
//   };








//   const AddBook = async (event) => {
//     try {
//       // Convert image file to Base64 string
//       // const base64Image = await new Promise((resolve, reject) => {
//       //     const reader = new FileReader();
//       //     reader.onload = () => resolve(reader.result);
//       //     reader.onerror = reject;
//       //     reader.readAsDataURL(state.coverImage); // Assumes state.coverImage is the file object
//       // });

//       // Prepare the data to be sent to the backend
//       // const bookData = {
//       //     title: state.title,
//       //     description: state.description,
//       //     publicationDate: state.publicationDate,
//       //     author: state.author,
//       //     coverImage: base64Image, // Attach the Base64 string as coverImage
//       // };

//       // Send the data as JSON
//       const response = await fetch('http://localhost:7000/books', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`, // Include the token
//           },
//           body: JSON.stringify(state),
//       });

//       if (!response.ok) {
//           const data = await response.json();
//           setNotification(`Failed to add book: ${data.message}`);
//           return;
//       }

//       setNotification('Book added successfully!');
//       setShowAddForm(false); // Hide the form
//       GetBooks(); // Refresh the list of books
//     }  catch (err) {
//       console.error('Failed to add book', err);
//       setNotification('An error occurred while adding the book');
//     }
//   };
  

//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');
//   let isAuthenticated = false;

//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       const currentTime = Date.now() / 1000;
//       if (decodedToken.exp < currentTime) {
//         localStorage.removeItem('token');
//       } else {
//         isAuthenticated = true;
//       }
//     } catch (error) {
//       console.error('Invalid token', error);
//     }
//   }

//   const handleLogOut = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };


//   const handleDelete = async (id) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setNotification('You must be logged in to delete books.');
//       return;
//     }
  
//     try {
//       const response = await fetch(`http://localhost:7000/books/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
  
//       if (!response.ok) {
//         const data = await response.json();
//         setNotification(`Failed to delete book: ${data.message}`);
//         return;
//       }
  
//       setNotification('Book deleted successfully.');
//       GetBooks(); // Refresh the list of books
//     } catch (err) {
//       console.error('Failed to delete book', err);
//       setNotification('An error occurred while deleting the book.');
//     }
//   };
  
//   const handleEdit = async (id, updatedBook) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setNotification('You must be logged in to edit books.');
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append('title', updatedBook.title);
//     formData.append('description', updatedBook.description);
//     formData.append('author', updatedBook.author);
//     if (updatedBook.coverImage) {
//       formData.append('coverImage', updatedBook.coverImage);
//     }
  
//     try {
//       const response = await fetch(`http://localhost:7000/books/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formData,
//       });
  
//       if (!response.ok) {
//         const data = await response.json();
//         setNotification(`Failed to edit book: ${data.message}`);
//         return;
//       }
  
//       setNotification('Book updated successfully.');
//       GetBooks(); // Refresh the list of books
//     } catch (err) {
//       console.error('Failed to edit book', err);
//       setNotification('An error occurred while editing the book.');
//     }
//   };
  

//   const UpdateBook = async (event) => 
//   {

//   }
  
//   useEffect(() => {
//     GetBooks();
//   }, []);

//   return (
//     <div>
//       {isAuthenticated ? (
//         <div className={styles.background}>
//           <div className="Admin_Div">
//             <button className="LogOut_btn" onClick={handleLogOut}>Log Out</button>
//             <button className="Add_btn" onClick={() => setShowAddForm(true)}>Add</button>
//             {notification && <div className="notification">{notification}</div>}
            
//             {showAddForm && (
//               <form className="AddBookForm" onSubmit={AddBook}>
//                 <h3>Add New Book</h3>
//                 <input
//                 name="title"
//                   type="text"
//                   placeholder="Title"
//                   value={state.title}
//                   // onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
//                   onChange={handleChange}
//                   required
//                 />
//                 <input
//                 name="author"
//                   type="text"
//                   placeholder="Author"
//                   value={state.author}
//                   // onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
//                   onChange={handleChange}
//                   required
//                 />
//                 <textarea
//                 name="description"
//                   placeholder="Description"
//                   value={state.description}
//                   // onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
//                   onChange={handleChange}
//                   required
//                 ></textarea>
//                 <textarea
//                 name="publicationDate"
//                   placeholder="publicationDate"
//                   value={state.publicationDate}
//                   // onChange={(e) => setNewBook({ ...newBook, publicationDate: e.target.value })}
//                   onChange={handleChange}
//                   required ></textarea>
//                 <input
//                 name="coverImage"
//                   type="file"
//                   accept="image/*"
//                   value={state.coverImage}
//                   // onChange={(e) => setNewBook({ ...newBook, coverImage: e.target.files[0] })}
//                   onChange={handleChange}
//                   required
//                 />
//                 <button type="submit">Submit</button>
//                 <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
//               </form>
//             )}
//             {/* <div>
//               <form className="update" onSubmit={UpdateBook}>
//                 <h3>Add New Book</h3>
//                 <input
//                 name="title"
//                   type="text"
//                   placeholder="Title"
//                   value={state.title}
//                   // onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
//                   onChange={handleChange}
//                   required
//                 />
//                 <input
//                 name="author"
//                   type="text"
//                   placeholder="Author"
//                   value={state.author}
//                   // onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
//                   onChange={handleChange}
//                   required
//                 />
//                 <textarea
//                 name="description"
//                   placeholder="Description"
//                   value={state.description}
//                   // onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
//                   onChange={handleChange}
//                   required
//                 ></textarea>
//                 <textarea
//                 name="publicationDate"
//                   placeholder="publicationDate"
//                   value={state.publicationDate}
//                   // onChange={(e) => setNewBook({ ...newBook, publicationDate: e.target.value })}
//                   onChange={handleChange}
//                   required ></textarea>
//                 <input
//                 name="coverImage"
//                   type="file"
//                   accept="image/*"
//                   value={state.coverImage}
//                   // onChange={(e) => setNewBook({ ...newBook, coverImage: e.target.files[0] })}
//                   onChange={handleChange}
//                   required
//                 />
//                 <button type="submit">Submit</button>
//                 <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
//               </form></div> */}

//             <div className="header">
//               <h1>Welcome</h1>
//               <h3>All Your Books</h3>
//             </div>
//             <div className="AdminBookContainer">
//               {books.map((book) => (
//                 <div key={book.id} className="AdminBookContainer" >
//                   <div className="card_Div">
//                     <Link className="Admin_Link">
//                       <div className="Admin_card">
//                         <img className="bookImg" src={book.coverImage} alt="Product Image" />
//                         <h3 className="bookTitle">{book.title}</h3>
//                       </div>
//                       <div className="iconBox">
//                         <img className="icon" src={edit} alt="edit button" onClick={() => handleEdit(book.id)} />
                        
//                         <img className="icon" src={deleteIcon} alt="delete button" 
//     onClick={() => handleDelete(book.id)}/>
//                       </div>
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <Footer />
//           </div>
//         </div>
//       ) : (
//         <Link to="/login">Back To Login Page</Link>
//       )}
//     </div>
//   );
// };

// export default Administrator;

// *********************************************************************





//NEW CODE


import Header from "./Header";
import styles from './HomePage.module.css';
import '../App.css';
import Footer from "./Footer";
import edit from "./edit.png";
import deleteIcon from "./delete.png";
import { useState, useEffect, useReducer } from "react";
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from "react-router-dom";

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};



const Administrator = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null); // Track the book being edited
  // const [newBook, setNewBook] = useState({
  //   title: '',
  //   description: '',
  //   publicationDate: '',
  //   author: '',
  //   coverImage: null, // For the image file
  // });

  const initialState = {
    title: '',
    description: '',
    publicationDate: '',
    author: '',
    coverImage: '', // For the image file
}

function reducer(state, action){
  console.log(action.type)
  switch (action.type){
      case 'updateField':
          return {
              ...state,
              [action.field]:action.value
          }
      case 'reset':
          return initialState
      default:
          return state
  }
}



const [state, dispatch] = useReducer(reducer, initialState)
const handleChange=(e)=>{
    dispatch({
        type:'updateField',
        field:e.target.name,
        value:e.target.value
    })
}


  const [notification, setNotification] = useState('');

  const GetBooks = async () => {
    try {
      const response = await fetch('http://localhost:7000/books', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'CANNOT GET BOOKS');
        return;
      }

      const data = await response.json();
      setBooks(data);
      setError('');
    } catch (err) {
      console.error('failed to get books', err);
      setError('An error occurred while getting books');
    }
  };

// *** HandleEditClick ***********************

const handleEditClick = (book) => {
  navigate(`/edit/${book.id}`); //navigates to edit page with the books id
};

const handleEditSubmit = async (event) => {
  event.preventDefault();

  const updatedBook = {
    id: currentBook.id, // Use the current book's ID
    title: state.title, // Assuming 'state' holds the form data
    author: state.author,
    // Add other book properties to be updated as needed
  };

  try {
    // Send a PUT request to update the book in the backend
    const response = await fetch(`http://localhost:7000/books/${currentBook.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    if (!response.ok) {
      throw new Error('Failed to update book');
    }

  // Logic for editing the book goes here
  // Use `state` and `currentBook.id` to update the book data in the backend
  setNotification('Book updated successfully!');
  setShowEditModal(false);
  GetBooks();
  }
  catch(error){
    console.error(error);
    setNotification('Failed to update book.');
  }
};

// *** HandleEditClick ********************_END_(above)***



const AddBook = async (event) => {
      try {  
        // Send the data as JSON
        const response = await fetch('http://localhost:7000/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the token
            },
            body: JSON.stringify(state),
        });
  
        if (!response.ok) {
            const data = await response.json();
            setNotification(`Failed to add book: ${data.message}`);
            return;
        }
  
        setNotification('Book added successfully!');
        setShowAddForm(false); // Hide the form
        GetBooks(); // Refresh the list of books
      }  catch (err) {
        console.error('Failed to add book', err);
        setNotification('An error occurred while adding the book');
      }
    };
  

  const navigate = useNavigate();
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

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };


  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setNotification('You must be logged in to delete books.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:7000/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const data = await response.json();
        setNotification(`Failed to delete book: ${data.message}`);
        return;
      }
  
      setNotification('Book deleted successfully.');
      GetBooks(); // Refresh the list of books
      window.location.reload();
    } catch (err) {
      console.error('Failed to delete book', err);
      setNotification('An error occurred while deleting the book.');
    }
  };
  
  useEffect(() => {
    GetBooks();
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <div className={styles.background}>
          <div className="Admin_Div">
            <button className="LogOut_btn" onClick={handleLogOut}>Log Out</button>
            <button className="Add_btn" onClick={() => setShowAddForm(true)}>Add</button>
            {notification && <div className="alert"> <div className="notification">{notification}</div> </div>}
            
            {showAddForm && (
              <form className="AddBookForm" onSubmit={AddBook}>
                <h3>Add New Book</h3>
                <input
                name="title"
                  type="text"
                  placeholder="Title"
                  value={state.title}
                  // onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  onChange={handleChange}
                  required
                />
                <input
                name="author"
                  type="text"
                  placeholder="Author"
                  value={state.author}
                  // onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  onChange={handleChange}
                  required
                />
                <textarea
                name="description"
                  placeholder="Description"
                  value={state.description}
                  // onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                  onChange={handleChange}
                  required
                ></textarea>
              <input
                type="date"
                name="publicationDate"
                  placeholder="publicationDate"
                  value={state.publicationDate}
                  // onChange={(e) => setNewBook({ ...newBook, publicationDate: e.target.value })}
                  onChange={handleChange}
                  required ></input>
                <input
                name="coverImage"
                  type="text"
                  value={state.coverImage}
                  placeholder="Please Input Image URL"
                  // onChange={(e) => setNewBook({ ...newBook, coverImage: e.target.files[0] })}
                  onChange={handleChange}
                  required
                />
 
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
              </form>
            )}
            <div className="header">
              <h1>Welcome</h1>
              <h3>All Your Books</h3>
            </div>
            <div className="AdminBookContainer">
              {books.map((book) => (
                <div key={book.id} className="AdminBookContainer" >
                  <div className="card_Div">
                    <Link className="Admin_Link">
                      <div className="Admin_card">
                        <img className="bookImg" src={book.coverImage} alt="Product Image" />
                        <h3 className="bookTitle">{book.title}</h3>
                      </div>
                      <div className="iconBox">
                      {/* <img className="icon" src={edit} alt="edit button" onClick={() => handleEditClick(book)}  /> */}
                      <Link to={`/edit/${book.id}`}>
  <img className="icon" src={edit} alt="edit button" />
</Link>
                        
                        <img className="icon" src={deleteIcon} alt="delete button" onClick={() => handleDelete(book.id)}/>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

        <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
          <form className="EditBookForm" onSubmit={handleEditSubmit}>
            <h3>Edit Book</h3>
            <input
              name="title"
              type="text"
              placeholder="Title"
              value={state.title}
              onChange={handleChange}
              required
            />
            <input
              name="author"
              type="text"
              placeholder="Author"
              value={state.author}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={state.description}
              onChange={handleChange}
              required
            ></textarea>
              <input
                type="date"
                name="publicationDate"
                  placeholder="publicationDate"
                  value={state.publicationDate}
                  // onChange={(e) => setNewBook({ ...newBook, publicationDate: e.target.value })}
                  onChange={handleChange}
                  required ></input>
                <input
                name="coverImage"
                  type="text"
                  value={state.coverImage}
                  placeholder="Please Input Image URL"
                  // onChange={(e) => setNewBook({ ...newBook, coverImage: e.target.files[0] })}
                  onChange={handleChange}
                  required
                />
            <button type="submit">Update</button>
            <button type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
          </form>
        </Modal>
            <Footer />
          </div>
        </div>
      ) : (
        <Link to="/login">Back To Login Page</Link>
      )}
    </div>
  );
};

export default Administrator;




