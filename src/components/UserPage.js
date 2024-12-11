import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './HomePage.module.css';

const UserPage = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const [currentBackground, setCurrentBackground] = useState(0);
    const navigate = useNavigate();
    const backgrounds = [
        '/Libary2.jpg',
        '/libary6.jpg',
        '/libary4.jpg',
        '/libary5.jpg',
       
    ];

    // Fetch books from the API
    const FetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:7000/books', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || 'Failed to fetch books.');
                return;
            }

            const data = await response.json();
            setBooks(data);
            setFilteredBooks(data);
            setError('');
        } catch (err) {
            console.error('Error fetching books:', err);
            setError('An error occurred while fetching books.');
        }
    };

    const handleLogOut = () => {
        //localStorage.removeItem('token');
        navigate('/administrator');
    };

    // Cycle through background images
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [backgrounds.length]);

    // Set background dynamically
    useEffect(() => {
        document.body.style.backgroundImage = `url(${backgrounds[currentBackground]})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundPosition = 'center';
        document.body.style.transition = 'background-image 1s ease-in-out';

        return () => {
            document.body.style.backgroundImage = '';
        };
    }, [currentBackground]);

    // Handle search functionality
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (!query.trim()) {
            setFilteredBooks(books);
            setError('');
            return;
        }

        const results = books.filter((book) => {
            return (
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query) ||
                book.description.toLowerCase().includes(query)
            );
        });

        if (results.length > 0) {
            setFilteredBooks(results);
            setError('');
        } else {
            setFilteredBooks([]);
            setError('No books found matching your search.');
        }
    };

    useEffect(() => {
        FetchBooks();
    }, []);

    return (
        <div>
            {/* Search Bar */}
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Search by title, author, or description..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className={styles.searchInput}
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="alert">
                    <p className={styles.errorMessage}>{error}</p>
                </div>
            )}

            {/* Book Cards */}
            <button className={styles.Log_Out} onClick={handleLogOut}>Log In As Admin</button>
            <div className={styles.cardContainer}>
                {filteredBooks.map((book) => (
                    <div key={book.id} className={styles.card}>
                        <img src={book.coverImage} alt={`${book.title} Cover`} />
                        <h1>{book.title}</h1>
                        <h2>{book.author}</h2>
                        <Link to={`/book/${book.id}`} className={styles.link}>
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPage;
