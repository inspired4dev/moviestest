const express = require("express");
const router = express.Router();
const {
  getClassifications,
  getClassification,
  updateClassification,
  newClassification,
  deleteClassification,
} = require("../controllers/classification.controllers");

router.get("/", (req, res, next) => getClassifications(req, res, next));

router.get("/:id", (req, res, next) => getClassification(req, res, next));

router.post("/", (req, res, next) => newClassification(req, res, next));

router.put("/:id", (req, res, next) => updateClassification(req, res, next));

router.delete("/:id", (req, res, next) => deleteClassification(req, res, next));

module.exports = router;
