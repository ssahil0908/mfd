import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function MovieCard({ movie, onDelete }) {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="bg-purple-100 p-4 rounded shadow cursor-pointer flex flex-col justify-between"
      onClick={() => navigate(`/movies/${movie._id}`)}
    >
      <div>
        <h2 className="text-xl font-bold mb-2 font-serif">{movie.name}</h2>
        <p className="italic mb-2">Released: {formatDate(movie.releaseDate)}</p>
        <p className="font-semi-bold font-serif">
          Rating: {movie.averageRating}/10
        </p>
      </div>

      <div className="flex justify-end items-center space-x-2 mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="text-gray-600 hover:text-gray-900"
        >
          <FaEdit />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete && typeof onDelete === "function") {
              onDelete(movie._id);
            } else {
              console.error("onDelete is not a function");
            }
          }}
          className="text-gray-600 hover:text-gray-900"
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
