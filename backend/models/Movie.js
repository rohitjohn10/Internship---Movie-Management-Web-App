const mongoose = require('mongoose');

/**
 * Movie Schema Definition
 * Defines the data structure for movie documents in MongoDB.
 * All fields are required with appropriate validation rules.
 */
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Movie title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    director: {
      type: String,
      required: [true, 'Director name is required'],
      trim: true,
      maxlength: [100, 'Director name cannot exceed 100 characters'],
    },
    releaseYear: {
      type: Number,
      required: [true, 'Release year is required'],
      min: [1888, 'Release year must be 1888 or later'],
      max: [new Date().getFullYear() + 5, 'Release year cannot be more than 5 years in the future'],
    },
    genre: {
      type: String,
      required: [true, 'Genre is required'],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [10, 'Rating cannot exceed 10'],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Movie', movieSchema);
