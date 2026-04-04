const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

exports.getAllTours = (req, res) => {
  console.log(req.requestedTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestedTime,
    result: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Data',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: tours,
        },
      });
    },
  );
};

exports.updateTour = (req, res) => {
  const id = Number(req.params.id);
  const tourIndex = tours.findIndex((el) => el.id === id);

  if (tourIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  tours[tourIndex] = { ...tours[tourIndex], ...req.body };

  fs.writeFileSync(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
  );

  res.status(200).json({
    status: 'success',
    data: {
      tour: tours[tourIndex],
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = Number(req.params.id);
  const tourIndex = tours.findIndex((el) => el.id === id);

  if (tourIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  tours.splice(tourIndex, 1);
  fs.writeFileSync(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
  );

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
