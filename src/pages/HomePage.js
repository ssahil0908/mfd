import React, { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("https://movie-review-hx22.onrender.com/api/movies");
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movies");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Filter movies based on the search term
  const filteredMovies = movies.filter(movie =>
    movie.name && movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <main className="p-8">
        <h1 className="text-3xl mb-6">The best movie review site!</h1>

        <div className="mb-6 relative">
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for your favourite movie"
            className="w-full px-10 py-2 border rounded shadow"
            onChange={e => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>

        {loading && <p>Loading movies...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {filteredMovies.length > 0 ? (
          <MovieList movies={filteredMovies} setMovies={setMovies} />
        ) : (
          !loading && <p className="text-gray-500">No movies found. Try searching for a different movie.</p>
        )}
      </main>
    </div>
  );
}

export default HomePage;
