import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies, setMovies }) {
  const handleDelete = async (movieId) => {
    try {
      const response = await fetch(
        `https://movie-review-hx22.onrender.com/api/movies/${movieId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie._id !== movieId)
        );
      } else {
        console.error("Failed to delete movie");
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default MovieList;
