import React, { useState } from "react";

function MovieSearch() {
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const searchMovie = () => {
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
        setError("Something went wrong.");
      });
  };

  return (
    <div>
      <h2>Search Movie</h2>

      <input
        type="text"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
        placeholder="Enter movie name"
      />

      <button onClick={searchMovie}>Search</button>

      {error && <p className="error">{error}</p>}

      <div>
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt={movie.Title} width="100" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;