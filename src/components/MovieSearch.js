import React, { useState } from "react";

function MovieSearch() {
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const searchMovie = (e) => {
    e.preventDefault();

    fetch(`https://www.omdbapi.com/?apikey=99eb9fd1&s=${movieName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "False") {
          setError("Invalid movie name. Please try again.");
          setMovies([]);
        } else {
          setMovies(data.Search);
          setError("");
        }
      })
      .catch(() => {
        setError("Invalid movie name. Please try again.");
      });
  };

  return (
    <div>
      <h2>Search Movie</h2>

      {/* IMPORTANT: form required for test */}
      <form onSubmit={searchMovie}>
        <input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder="Search movie"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {/* IMPORTANT: li required for test */}
      <ul>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt={movie.Title} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSearch;