import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import AddMoviePage from './pages/AddMoviePage';
import AddReviewPage from './pages/AddReviewPage';

function App() {
  return (
    <Router>
      <header className="bg-purple-100 w-full py-4 px-8 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="text-gray-800 hover:text-purple-500 no-underline">MOVIECRITIC</Link>
        </h1>
        <div>
          <button className="bg-white text-blue-500 px-4 py-2 rounded mr-2 shadow hover:bg-gray-100">
            <Link to="/add-movie" className="text-blue-500 no-underline">Add New Movie</Link>
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-600">
            <Link to="/add-review" className="text-white no-underline">Add New Review</Link>
          </button>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
        <Route path="/add-movie" element={<AddMoviePage />} />
        <Route path="/add-review" element={<AddReviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
