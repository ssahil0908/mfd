import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://movie-review-hx22.onrender.com/api/movies/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie');
        }
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(`https://movie-review-hx22.onrender.com/api/reviews/${id}`);
        if (!response.ok) {
          //throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
    fetchReviews();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Movie not found!</p>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold">{movie.name}</h1>
        <p className="text-4xl font-bold text-purple-600">
          {movie.averageRating ? movie.averageRating.toFixed(2) : "N/A"}/10
        </p>
      </div>
      <p className="italic mb-4">
        Released: {new Date(movie.releaseDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <h2 className="text-xl font-bold mb-4">Reviews:</h2>
      <ul>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li
              key={review._id}
              className="border rounded-md p-4 mb-4 shadow-lg"
            >
              <p className="mb-2">{review.comments}</p> 
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  By {review.reviewerName}
                </p>
                <p className="text-lg font-bold">{review.rating}/10</p>
              </div>
              <div className="mt-2 flex justify-end space-x-2">
                <button className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-edit"></i> 
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-trash"></i> 
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </ul>
    </div>
  );
}

export default MovieDetailPage;
