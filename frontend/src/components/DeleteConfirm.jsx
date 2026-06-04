/**
 * DeleteConfirm Component
 * Modal dialog that asks for user confirmation before deleting a movie.
 * @param {Object} movie - The movie object to be deleted
 * @param {function} onConfirm - Callback when delete is confirmed
 * @param {function} onCancel - Callback when delete is cancelled
 */
const DeleteConfirm = ({ movie, onConfirm, onCancel }) => {
  if (!movie) return null;

  // Close modal when clicking the backdrop
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onCancel();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal delete-modal">
        <div className="delete-modal-body">
          <div className="delete-icon">🗑️</div>
          <h3 className="delete-modal-title">Delete Movie</h3>
          <p className="delete-modal-text">
            Are you sure you want to delete{' '}
            <span className="delete-movie-name">"{movie.title}"</span>?
            <br />This action cannot be undone.
          </p>
          <div className="delete-modal-actions">
            <button className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn-confirm-delete" onClick={() => onConfirm(movie._id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
