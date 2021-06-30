//REQUIRES
const movies = require("../models/movies");

/**
 * @name MoviesControllers
 * @description Apply DB consulting CRUD by mongoose Methods for movies
 * @autor Brayam Nuñez
 * @version 0.1.0
 *
 */

const getMovies = async (req, res, next) => {
  try {
    const moviesList = await movies.find();
    res.status(200).json(moviesList);
  } catch (err) {
    res.status(500).send({});
  }
};

const getMovie = async (req, res, next) => {
  try {
    const movie = await movies.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).send({});
  }
};

const newMovie = async (req, res, next) => {
  try {
    const { name, director, classification, urlTrailer, urlImg } = req.body;
    const newMovie = new movies({
      name,
      director,
      classification,
      urlTrailer,
      urlImg,
    });
    newMovie.urlTrailer = newMovie.urlTrailer.substr(-11, 11);
    await newMovie.save();
    res.status(200).json(newMovie);
  } catch (err) {
    res.status(500).send({});
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const { name, director, classification, urlTrailer, urlImg } = req.body;
    const updatedMovie = { name, director, classification, urlTrailer, urlImg };
    updatedMovie.urlTrailer = updatedMovie.urlTrailer.substr(-11, 11);
    await movies.findByIdAndUpdate(req.params.id, updatedMovie);
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).send({});
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    await movies.findByIdAndRemove(req.params.id);
    res.status(200).json("deleted " + req.params.id);
  } catch (err) {
    res.status(500).send({});
  }
};

module.exports = {
  getMovies,
  getMovie,
  newMovie,
  updateMovie,
  deleteMovie,
};
