import React, { useState } from 'react';

const AddMoviePage = () => {
  const [name, setName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMovie = { name, releaseDate };
    const response = await fetch('https://movie-review-hx22.onrender.com/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
    });

    if (response.ok) {
      alert('Movie added successfully!');
      setName('');
      setReleaseDate('');
    } else {
      const error = await response.json();
      alert(`Failed to add movie: ${error.message}`);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8 border rounded-md shadow-lg p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">Add new movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            placeholder="Release date"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
          >
            Create movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMoviePage;
