import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './HomePage.module.css';

const UserPage = () => {

    const location = useLocation();

    const [books, setBooks] = useState([]); // All books from the API
    const [filteredBooks, setFilteredBooks] = useState([]); // Books after filtering
    const [searchQuery, setSearchQuery] = useState(''); // User's search input
    const [error, setError] = useState(''); // Error message

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
            setFilteredBooks(data); // Initially, show all books
            setError('');
        } catch (err) {
            console.error('Error fetching books:', err);
            setError('An error occurred while fetching books.');
        }
    };

    // Normalize date for search
    const normalizeDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
    };

    // Handle search functionality
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (!query.trim()) {
            // If the query is empty, show all books
            setFilteredBooks(books);
            setError('');
            return;
        }

        // Filter books by title, author, description, or publication date
        const results = books.filter((book) => {
            return (
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query) ||
                book.description.toLowerCase().includes(query) ||
                normalizeDate(book.publicationDate).includes(query)
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

    useEffect(() => {
        document.body.style.backgroundImage = 'url(./backgroundimg.png)';
        document.body.style.backgroundColor = '#50defb';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundPosition = 'center';
        document.body.style.margin = '0';
        document.body.style.padding = '0';

        return () => {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundRepeat = '';
            document.body.style.backgroundPosition = '';
            document.body.style.margin = '';
            document.body.style.padding = '';
        };
    }, []);


    return (
        <div>
            {/* Search Bar */}
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Search by title, author, description, or date..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className={styles.searchInput}
                />
            </div>

            {/* Error Message */}
            {error &&<div className="alert"> <p className={styles.errorMessage}>{error}</p> </div>}

            {/* Book Cards */}
            <div className={styles.cardContainer}>
                {filteredBooks.map((book) => (
                    <div key={book.id} className={styles.card}>
                        <img src={book.coverImage} alt={`${book.title} Cover`} />
                        <h1>{book.title}</h1>
                        <h2>{book.author}</h2>
                        <p style={{display: "none"}}>Published: {normalizeDate(book.publicationDate)}</p>
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
