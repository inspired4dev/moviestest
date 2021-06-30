//REQUIRES
const classification = require("../models/classification");

/**
 * @name ClassificationControllers
 * @description Apply DB consulting CRUD by mongoose Methods for classification
 * @autor Brayam Nuñez
 * @version 0.1.0
 *
 */

const getClassifications = async (req, res, next) => {
  try {
    const listClassifications = await classification.find();
    res.status(200).json(listClassifications);
  } catch (err) {
    res.status(500).send({});
  }
};

const getClassification = async (req, res, next) => {
  try {
    const classificationId = await classification.findById(req.params.id);
    res.status(200).json(classificationId);
  } catch (err) {
    res.status(500).send({});
  }
};

const newClassification = async (req, res, next) => {
  try {
    const { name } = req.body;
    const createdClassification = new classification({
      name,
    });
    await createdClassification.save();
    res.status(200).json(createdClassification);
  } catch (err) {
    res.status(500).send({});
  }
};

const updateClassification = async (req, res, next) => {
  try {
    const { name } = req.body;
    const updatedClassification = { name };
    await classification.findByIdAndUpdate(
      req.params.id,
      updatedClassification
    );
    res.status(200).json(updatedClassification);
  } catch (err) {
    res.status(500).send({});
  }
};

const deleteClassification = async (req, res, next) => {
  try {
    await classification.findByIdAndRemove(req.params.id);
    res.status(200).json("deleted " + req.params.id);
  } catch (err) {
    res.status(500).send({});
  }
};

module.exports = {
  getClassifications,
  getClassification,
  newClassification,
  updateClassification,
  deleteClassification,
};
