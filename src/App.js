import { useState, useEffect } from 'react'
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com/?apikey=e5b66915';

const movie1 = {
    'Title': "Iron Man",
    'Type': "movie",
    'Year': "2008",
    'imdbID': "tt0371746",
    'Poster': "N/A"
}

const App = () => {
    
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Iron Man');
    } , []);

  return (
    <div className='app'>
      <h1>CineVerse</h1>

      <div className='search'>
        <input
            placeholder='Search for a movie...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
            src={SearchIcon}
            alt='Search'
            onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies.length > 0 
        ? (
        <div className='container'>
            {movies.map((movie) => (
                <MovieCard movie={movie}  />))}
        </div>
        ) : (
        <div className='empty'>
            <h2>No movies found</h2>
        </div>
        )}
    </div>
  );
}

export default App;
