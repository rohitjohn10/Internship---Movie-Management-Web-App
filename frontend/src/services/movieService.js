import axios from 'axios';

/**
 * Axios instance configured with the backend API base URL.
 * Centralizes all HTTP communication with the Express server.
 */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

/**
 * Fetch all movies from the database.
 * @returns {Promise<Array>} Array of movie objects
 */
export const getAllMovies = async () => {
  const response = await API.get('/movies');
  return response.data;
};

/**
 * Create a new movie entry.
 * @param {Object} movieData - The movie data to create
 * @returns {Promise<Object>} The created movie object
 */
export const createMovie = async (movieData) => {
  const response = await API.post('/movies', movieData);
  return response.data;
};

/**
 * Update an existing movie by ID.
 * @param {string} id - The movie's MongoDB ObjectId
 * @param {Object} movieData - The updated movie data
 * @returns {Promise<Object>} The updated movie object
 */
export const updateMovie = async (id, movieData) => {
  const response = await API.put(`/movies/${id}`, movieData);
  return response.data;
};

/**
 * Delete a movie by ID.
 * @param {string} id - The movie's MongoDB ObjectId
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteMovie = async (id) => {
  const response = await API.delete(`/movies/${id}`);
  return response.data;
};
