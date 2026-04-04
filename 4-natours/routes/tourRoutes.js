const express = require('express');
const router = express.Router();
const tourControllers = require('./../controllers/tourControllers');

router.param('id', (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  next();
});

router
  .route(`/`)
  .get(tourControllers.getAllTours)
  .post(tourControllers.createTour);
router
  .route(`/:id`)
  .get(tourControllers.getTour)
  .patch(tourControllers.updateTour)
  .delete(tourControllers.deleteTour);

module.exports = router;
