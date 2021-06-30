const express = require("express");
const router = express.Router();
const {
  getMovies,
  getMovie,
  newMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies.controllers");

router.get("/", (req, res, next) => getMovies(req, res, next));

router.get("/:id", (req, res, next) => getMovie(req, res, next));

router.post("/", (req, res, next) => newMovie(req, res, next));

router.put("/:id", (req, res, next) => updateMovie(req, res, next));

router.delete("/:id", (req, res, next) => deleteMovie(req, res, next));

module.exports = router;
