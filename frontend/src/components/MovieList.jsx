import MovieCard from './MovieCard';

/**
 * MovieList Component
 * Renders the movie grid, loading state, or empty state.
 * @param {Array} movies - Array of movie objects to display
 * @param {boolean} loading - Whether movies are being fetched
 * @param {function} onEdit - Callback to edit a movie
 * @param {function} onDelete - Callback to delete a movie
 * @param {function} onAddClick - Callback for the empty state add button
 */
const MovieList = ({ movies, loading, onEdit, onDelete, onAddClick }) => {
  // Loading state with spinner
  if (loading) {
    return (
      <div className="loading-container" id="loading-state">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading your movie collection...</p>
      </div>
    );
  }

  // Empty state when no movies exist
  if (movies.length === 0) {
    return (
      <div className="empty-state" id="empty-state">
        <div className="empty-state-icon">🍿</div>
        <h2 className="empty-state-title">No Movies Yet</h2>
        <p className="empty-state-text">
          Your movie vault is empty. Start building your collection by adding
          your first recently watched movie!
        </p>
        <button className="btn-empty-add" onClick={onAddClick}>
          <span>+</span> Add Your First Movie
        </button>
      </div>
    );
  }

  // Movie grid
  return (
    <div className="movie-grid-container">
      <div className="movie-grid" id="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
