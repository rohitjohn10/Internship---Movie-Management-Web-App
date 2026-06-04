import StarRating from './StarRating';

/**
 * MovieCard Component
 * Displays a single movie's information in a glassmorphism card.
 * @param {Object} movie - The movie data object
 * @param {function} onEdit - Callback to edit this movie
 * @param {function} onDelete - Callback to delete this movie
 */
const MovieCard = ({ movie, onEdit, onDelete }) => {
  return (
    <article className="movie-card" id={`movie-card-${movie._id}`}>
      <div className="movie-card-header">
        <h3 className="movie-title">{movie.title}</h3>
        <span className="movie-genre-badge">{movie.genre}</span>
      </div>

      <div className="movie-details">
        <div className="movie-detail-row">
          <span className="detail-icon">🎥</span>
          <span className="detail-label">Director</span>
          <span>{movie.director}</span>
        </div>
        <div className="movie-detail-row">
          <span className="detail-icon">📅</span>
          <span className="detail-label">Year</span>
          <span>{movie.releaseYear}</span>
        </div>
      </div>

      <div className="movie-rating">
        <StarRating rating={movie.rating} readonly />
        <span className="movie-rating-value">{movie.rating}/10</span>
      </div>

      <div className="movie-card-actions">
        <button
          className="btn-card-action btn-edit"
          onClick={() => onEdit(movie)}
          aria-label={`Edit ${movie.title}`}
        >
          ✏️ Edit
        </button>
        <button
          className="btn-card-action btn-delete"
          onClick={() => onDelete(movie)}
          aria-label={`Delete ${movie.title}`}
        >
          🗑️ Delete
        </button>
      </div>
    </article>
  );
};

export default MovieCard;
