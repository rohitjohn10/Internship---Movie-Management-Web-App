import { useEffect, useState } from 'react';

/**
 * Toast Notification Component
 * Displays success/error messages that auto-dismiss after a delay.
 * @param {Array} toasts - Array of toast objects { id, message, type }
 * @param {function} onRemove - Callback to remove a toast by ID
 */
const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

const Toast = ({ toast, onRemove }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Auto-dismiss after 4 seconds
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onRemove(toast.id), 250); // Wait for exit animation
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => onRemove(toast.id), 250);
  };

  return (
    <div className={`toast toast-${toast.type} ${exiting ? 'toast-exiting' : ''}`}>
      <span className="toast-icon">
        {toast.type === 'success' ? '✅' : '❌'}
      </span>
      <span className="toast-message">{toast.message}</span>
      <button className="btn-toast-close" onClick={handleClose} aria-label="Close notification">
        ✕
      </button>
    </div>
  );
};

export default ToastContainer;
