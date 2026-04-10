const Tour = require('../models/tourModels');

exports.getAllTours = (req, res) => {};

exports.getTour = (req, res) => {};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid Data set!!.. ',
    });
  }
};

exports.updateTour = (req, res) => {};

exports.deleteTour = (req, res) => {};
