import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';
import DeleteConfirm from './components/DeleteConfirm';
import ToastContainer from './components/Toast';
import { getAllMovies, createMovie, updateMovie, deleteMovie } from './services/movieService';
import './App.css';

/**
 * App Component — Root of the Movie Management Application
 * Manages global state: movies list, modals, and toast notifications.
 * Orchestrates CRUD operations via the movieService API layer.
 */
function App() {
  // --- State ---
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [deletingMovie, setDeletingMovie] = useState(null);
  const [toasts, setToasts] = useState([]);

  // --- Toast Helpers ---
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // --- Fetch Movies on Mount ---
  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllMovies();
      setMovies(data);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      addToast('Failed to load movies. Is the backend running?', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // --- CRUD Handlers ---

  /** Create a new movie */
  const handleCreate = async (movieData) => {
    try {
      const newMovie = await createMovie(movieData);
      setMovies((prev) => [newMovie, ...prev]);
      setShowForm(false);
      addToast(`"${newMovie.title}" added to your collection!`);
    } catch (error) {
      const msg = error.response?.data?.errors?.[0] || error.response?.data?.message || 'Failed to add movie';
      addToast(msg, 'error');
      throw error; // Re-throw so MovieForm knows submission failed
    }
  };

  /** Update an existing movie */
  const handleUpdate = async (movieData) => {
    try {
      const updated = await updateMovie(editingMovie._id, movieData);
      setMovies((prev) => prev.map((m) => (m._id === updated._id ? updated : m)));
      setEditingMovie(null);
      setShowForm(false);
      addToast(`"${updated.title}" updated successfully!`);
    } catch (error) {
      const msg = error.response?.data?.errors?.[0] || error.response?.data?.message || 'Failed to update movie';
      addToast(msg, 'error');
      throw error;
    }
  };

  /** Delete a movie after confirmation */
  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      const deletedTitle = movies.find((m) => m._id === id)?.title;
      setMovies((prev) => prev.filter((m) => m._id !== id));
      setDeletingMovie(null);
      addToast(`"${deletedTitle}" removed from your collection.`);
    } catch (error) {
      addToast('Failed to delete movie. Please try again.', 'error');
    }
  };

  // --- Modal Handlers ---
  const openAddForm = () => {
    setEditingMovie(null);
    setShowForm(true);
  };

  const openEditForm = (movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingMovie(null);
  };

  // --- Computed Stats ---
  const avgRating = movies.length
    ? (movies.reduce((sum, m) => sum + m.rating, 0) / movies.length).toFixed(1)
    : '0.0';

  const topGenre = movies.length
    ? Object.entries(
        movies.reduce((acc, m) => ({ ...acc, [m.genre]: (acc[m.genre] || 0) + 1 }), {})
      ).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'
    : '—';

  return (
    <div className="app" id="app-root">
      {/* Header with Add Movie button */}
      <Header onAddClick={openAddForm} movieCount={movies.length} />

      {/* Stats Bar */}
      {movies.length > 0 && (
        <div className="stats-bar" id="stats-bar">
          <div className="stat-card">
            <span className="stat-icon">🎬</span>
            <div className="stat-info">
              <span className="stat-value">{movies.length}</span>
              <span className="stat-label">Total Movies</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">⭐</span>
            <div className="stat-info">
              <span className="stat-value">{avgRating}</span>
              <span className="stat-label">Avg Rating</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🏷️</span>
            <div className="stat-info">
              <span className="stat-value">{topGenre}</span>
              <span className="stat-label">Top Genre</span>
            </div>
          </div>
        </div>
      )}

      {/* Movie Grid / Loading / Empty State */}
      <MovieList
        movies={movies}
        loading={loading}
        onEdit={openEditForm}
        onDelete={(movie) => setDeletingMovie(movie)}
        onAddClick={openAddForm}
      />

      {/* Add/Edit Movie Modal */}
      {showForm && (
        <MovieForm
          movie={editingMovie}
          onSubmit={editingMovie ? handleUpdate : handleCreate}
          onClose={closeForm}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingMovie && (
        <DeleteConfirm
          movie={deletingMovie}
          onConfirm={handleDelete}
          onCancel={() => setDeletingMovie(null)}
        />
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
