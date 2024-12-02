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

    return ( 
        <div>
            {
                books.map((book) => (
                    <div key={book.id}>
                        <Link className={styles.link}>
                            <img src={book.coverImage} alt="Product Image"/>
                            <h1>Title: {book.title}</h1>
                            <h2>Author: {book.author}</h2>
                            <p>Description: {book.description}</p>
                            <p>Publication Date: {book.publicationDate}</p>
                        </Link>               
                    </div>
                ))
            }      
        </div>

     );
}
 
export default UserPage;