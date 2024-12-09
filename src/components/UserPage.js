import Header from "./Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './HomePage.module.css';

const UserPage = () => {

    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');

    const FetchBooks = async () =>{
        try {
        const response = await fetch('http://localhost:7000/books', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }          
        });
    
        if (!response.ok) {
          // Handle failure
          const data = await response.json();
          setError(data.message || 'CANNOT GET BOOKS');
          return;
        }
        const data = await response.json();
        console.log(data);
        setBooks(data); 
        setError('');
      } catch (err) {
        console.error('Getting Books failed', err);
        setError('An error occurred while getting books');
      } 
    }

    useEffect(()=>{
        FetchBooks();
    }, [])

    useEffect(()=>{
      document.body.style.backgroundImage = 'url(./backgroundimg.png)';
      document.body.style.backgroundSize = 'cover'; // Optional, to make sure the background covers the entire screen
      document.body.style.backgroundRepeat = 'no-repeat'; 
      document.body.style.backgroundPosition = 'center';
      document.body.style.margin = '0';
      document.body.style.padding = '0';

 
     return () =>{
       document.body.style.backgroundColor = '';
       document.body.style.backgroundSize = '';
       document.body.style.backgroundRepeat = '';
       document.body.style.backgroundPosition = '';
       document.body.style.height = '';
       document.body.style.margin = '';
       document.body.style.padding = '';
     }
   }, [])
 

   return (
    <div className={styles.cardContainer}>
        {books.length > 0 ? (
            books.map((book) => (
                <div key={book.id} className={styles.card}>
                    <img src={book.coverImage} alt={`${book.title} Cover`} />
                    <h1>{book.title}</h1>
                    <h2> {book.author}</h2>
                    {/* <p>{book.description}</p>
                    <p>Published: {book.publicationDate}</p> */}
                    <Link to={`/book/${book.id}`} className={styles.link}>
                        View Details
                    </Link>
                </div>
            ))
        ) : (
            <p>{error || 'Loading books...'}</p>
        )}
    </div>
);
};

export default UserPage;