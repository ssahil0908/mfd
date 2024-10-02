import React, { useState, useEffect } from 'react';

const AddReviewPage = () => {
  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('https://movie-review-hx22.onrender.com/api/movies');
      if (response.ok) {
        const data = await response.json();
        setMovies(data);
      } else {
        alert('Failed to load movies.');
      }
    };
    fetchMovies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      movieId,
      reviewerName,
      rating,
      comments,
    };

    const response = await fetch('https://movie-review-hx22.onrender.com/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReview),
    });

    if (response.ok) {
      alert('Review added successfully!');
      setMovieId('');
      setReviewerName('');
      setRating('');
      setComments('');
    } else {
      const error = await response.json();
      alert(`Failed to add review: ${error.message}`);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8 border rounded-md shadow-lg p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add new review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <select
              value={movieId}
              onChange={(e) => setMovieId(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full text-gray-700"
              required
            >
              <option value="">Select a movie</option>
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              placeholder="Your name"
              className="border border-gray-300 rounded-md p-2 w-full text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Rating out of 10"
              className="border border-gray-300 rounded-md p-2 w-full text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Review comments"
              className="border border-gray-300 rounded-md p-2 w-full text-gray-700 h-24"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
            >
              Add review
            </button>
          </div>
        </form>
    </div>
  );
};

export default AddReviewPage;
