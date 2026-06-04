const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

/**
 * @route   GET /api/movies
 * @desc    Fetch all movies, sorted by most recently added
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching movies', error: error.message });
  }
});

/**
 * @route   GET /api/movies/:id
 * @desc    Fetch a single movie by its ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid movie ID format' });
    }
    res.status(500).json({ message: 'Server error while fetching movie', error: error.message });
  }
});

/**
 * @route   POST /api/movies
 * @desc    Create a new movie entry
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    const { title, director, releaseYear, genre, rating } = req.body;

    // Create new movie document
    const movie = new Movie({ title, director, releaseYear, genre, rating });
    const savedMovie = await movie.save();

    res.status(201).json(savedMovie);
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: 'Validation failed', errors: messages });
    }
    res.status(500).json({ message: 'Server error while creating movie', error: error.message });
  }
});

/**
 * @route   PUT /api/movies/:id
 * @desc    Update an existing movie by its ID
 * @access  Public
 */
router.put('/:id', async (req, res) => {
  try {
    const { title, director, releaseYear, genre, rating } = req.body;

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, director, releaseYear, genre, rating },
      { new: true, runValidators: true } // Return updated doc & run schema validators
    );

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json(movie);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: 'Validation failed', errors: messages });
    }
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid movie ID format' });
    }
    res.status(500).json({ message: 'Server error while updating movie', error: error.message });
  }
});

/**
 * @route   DELETE /api/movies/:id
 * @desc    Delete a movie by its ID
 * @access  Public
 */
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie deleted successfully', deletedMovie: movie });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid movie ID format' });
    }
    res.status(500).json({ message: 'Server error while deleting movie', error: error.message });
  }
});

module.exports = router;
