/**
 * Header Component
 * Displays the app branding and the "Add Movie" call-to-action button.
 * @param {function} onAddClick - Callback when the Add Movie button is clicked
 * @param {number} movieCount - Total number of movies for display
 */
const Header = ({ onAddClick, movieCount }) => {
  return (
    <header className="header" id="app-header">
      <div className="header-content">
        <div className="header-brand">
          <span className="header-icon" role="img" aria-label="Movie">🎬</span>
          <div>
            <h1 className="header-title">MovieVault</h1>
            <p className="header-subtitle">Your Personal Movie Collection</p>
          </div>
        </div>
        <button className="btn-add-movie" onClick={onAddClick} id="btn-add-movie">
          <span className="btn-icon">+</span>
          <span>Add Movie</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
