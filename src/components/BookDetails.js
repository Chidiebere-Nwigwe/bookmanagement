import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./HomePage.module.css"
import Footer from "./Footer";
const BookDetails = () => {
 
    const [highlighted, setHighlighted] = useState(false);
    const [book, setBook] = useState({});
    const [error, setError] = useState('');
    const{id} = useParams()  // destructuring id from route
 
    const FetchBookById = async () =>{
        try {
        const response = await fetch(`http://localhost:7000/books/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }          
        });
   
        if (!response.ok) {
          // Handle failure
          const data = await response.json();
          setError(data.message || `CANNOT GET BOOK WITH ID: ${id}`);
          return;
        }
        const data = await response.json();
        setBook(data);
        setError('');
      } catch (err) {
        console.error(`CANNOT GET BOOK WITH ID: ${id} FAILED`, err);
        setError('An error occurred while getting book');
      }
    }
 
    useEffect(()=>{
        FetchBookById();
    }, [])
 
    useEffect(()=>{
        document.body.style.backgroundImage = 'url(../backgroundimg.png)';
        document.body.style.backgroundSize = 'cover'; // Ensures the background covers the entire screen
        document.body.style.backgroundRepeat = 'no-repeat'; // Prevents the background from repeating
        document.body.style.backgroundPosition = 'center'; // Centers the background image
        document.body.style.backgroundAttachment = 'fixed'; // Keeps the background fixed during scrolling (optional)
        document.body.style.backgroundColor = 'lightBlue';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.backgroundSize = '113% 117%';
        document.body.style.height = '100vh';
        document.body.style.width = '100vw';
        // document.body.style.overflow = 'hidden';
 
       return () =>{
         document.body.style.backgroundColor = '';
       }
     }, [])
 
    return (
        <div className={styles.bookDetailsDiv}>
                      <Link to='/user'><button className={styles.bookDetailsButton}>Back</button></Link>
                      <h1>{book.title}</h1>
        <div className={styles.bookDetailsMainDiv}>
 
           
 
            <img className={styles.bookDetailsImg} src={book.coverImage} alt="" />
            <div className={styles.details}>
                <p><span>Author:</span> {book.author}</p>
                <p><span  >Description:</span> {book.description}</p>
                <p><span>Publication Date:</span> {book.publicationDate}</p>
            </div>
 
 
        </div>
        <div>
        <Footer className={styles.footersForBookDetails} highlighted={highlighted}/>
        </div>
       
        </div>
     );
}
 
export default BookDetails;
