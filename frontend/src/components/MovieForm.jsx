import { useState, useEffect } from 'react';
import StarRating from './StarRating';

/** Available genre options for the dropdown selector */
const GENRE_OPTIONS = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
  'Documentary', 'Drama', 'Fantasy', 'Horror', 'Musical',
  'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western',
];

/**
 * MovieForm Component
 * Modal form for adding a new movie or editing an existing one.
 * Handles form validation and submission.
 * @param {Object|null} movie - Movie to edit (null for add mode)
 * @param {function} onSubmit - Callback with form data on submission
 * @param {function} onClose - Callback to close the modal
 */
const MovieForm = ({ movie, onSubmit, onClose }) => {
  const isEditMode = Boolean(movie);

  // Form state initialized from movie data (edit) or defaults (add)
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    releaseYear: '',
    genre: '',
    rating: 0,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Populate form when editing an existing movie
  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title || '',
        director: movie.director || '',
        releaseYear: movie.releaseYear || '',
        genre: movie.genre || '',
        rating: movie.rating || 0,
      });
    }
  }, [movie]);

  /** Update individual form field */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  /** Update rating from StarRating component */
  const handleRatingChange = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: '' }));
    }
  };

  /** Client-side form validation */
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.director.trim()) newErrors.director = 'Director is required';
    if (!formData.genre) newErrors.genre = 'Genre is required';
    if (!formData.rating) newErrors.rating = 'Rating is required';

    const year = Number(formData.releaseYear);
    if (!formData.releaseYear) {
      newErrors.releaseYear = 'Release year is required';
    } else if (isNaN(year) || year < 1888 || year > new Date().getFullYear() + 5) {
      newErrors.releaseYear = `Year must be between 1888 and ${new Date().getFullYear() + 5}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Handle form submission */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        releaseYear: Number(formData.releaseYear),
      });
    } finally {
      setSubmitting(false);
    }
  };

  /** Close modal when clicking the backdrop */
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" id="movie-form-modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {isEditMode ? '✏️ Edit Movie' : '🎬 Add New Movie'}
          </h2>
          <button className="btn-modal-close" onClick={onClose} aria-label="Close form">
            ✕
          </button>
        </div>

        <form className="movie-form" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-group">
            <label className="form-label" htmlFor="movie-title">Title</label>
            <input
              className="form-input"
              id="movie-title"
              name="title"
              type="text"
              placeholder="e.g. Inception"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          {/* Director */}
          <div className="form-group">
            <label className="form-label" htmlFor="movie-director">Director</label>
            <input
              className="form-input"
              id="movie-director"
              name="director"
              type="text"
              placeholder="e.g. Christopher Nolan"
              value={formData.director}
              onChange={handleChange}
            />
            {errors.director && <span className="form-error">{errors.director}</span>}
          </div>

          {/* Release Year */}
          <div className="form-group">
            <label className="form-label" htmlFor="movie-year">Release Year</label>
            <input
              className="form-input"
              id="movie-year"
              name="releaseYear"
              type="number"
              placeholder="e.g. 2010"
              value={formData.releaseYear}
              onChange={handleChange}
            />
            {errors.releaseYear && <span className="form-error">{errors.releaseYear}</span>}
          </div>

          {/* Genre */}
          <div className="form-group">
            <label className="form-label" htmlFor="movie-genre">Genre</label>
            <select
              className="form-select"
              id="movie-genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            >
              <option value="">Select a genre...</option>
              {GENRE_OPTIONS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            {errors.genre && <span className="form-error">{errors.genre}</span>}
          </div>

          {/* Rating */}
          <div className="form-group form-rating-group">
            <label className="form-label">Rating</label>
            <div className="form-rating-display">
              <StarRating rating={formData.rating} onRate={handleRatingChange} />
              <span className="form-rating-text">
                {formData.rating > 0 ? `${formData.rating}/10` : 'Select'}
              </span>
            </div>
            {errors.rating && <span className="form-error">{errors.rating}</span>}
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting
                ? 'Saving...'
                : isEditMode
                  ? 'Update Movie'
                  : 'Add Movie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
