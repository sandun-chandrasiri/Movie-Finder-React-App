import { useState,useEffect } from 'react';

import MovieCard from './MovieCard'

import './App.css';
import SearchIcon from './search.svg';
//25d5d1c0
const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=25d5d1c0';

const movie1 = {
    "Title": "Batman: The Animated Series",
    "Year": "1992–1995",
    "imdbID": "tt0103359",
    "Type": "series",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOTM3MTRkZjQtYjBkMy00YWE1LTkxOTQtNDQyNGY0YjYzNzAzXkEyXkFqcGdeQXVyOTgwMzk1MTA@._V1_SX300.jpg"
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
        searchMovies('batman');
    }, []);

    return (
        <div className='app'>
            <h1>Movie Land</h1>

            <div className='search'>
                <input
                    placeholder='Search for the movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />

            </div>

            {movies?.length > 0
                ?(
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie = {movie} />
                        ))}
                    </div>
                ) : (
                    <div clasName='empty'>
                        <h2>No Moive Found.</h2>
                    </div>
                )}            
        </div>
    );
}

export default App;