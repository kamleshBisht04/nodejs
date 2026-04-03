const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// MIDDLEWERE
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('Hello this is from middlewere......');
  next();
});

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);

// ROUTE HANDLER

const getAllTours = (req, res) => {
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

const getTour = (req, res) => {
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

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
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

const deleteTour = (req, res) => {
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

// User Route handlere

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This message is not define..',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This message is not define..',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This message is not define..',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This message is not define..',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This message is not define..',
  });
};

// ROUTE CRUD OPERATION TOUR IN CHANING
app.route(`/api/v1/tours`).get(getAllTours).post(createTour);
app
  .route(`/api/v1/tours/:id`)
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// ROUTE CRUD OPERATION USERS IN CHANING

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App Running on port no ${port}...`);
});

// ===========================================================
// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Hello from the server side ..',
//     fullName: 'kamlesh bisht',
//     profile: 'mern devloper',
//     address: 'Delhi',
//   });
// });

// app.post('/', (req, res) => {
//   res.send(`You can post to the end..`);
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`App runing on port ${port}`);
// });

//=============curd oprerations========================================

// const fs = require('fs');
// const express = require('express');

// const app = express();
// app.use(express.json());

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
// );

// // GET METHOD

// app.get(`/api/v1/tours`, (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     result: tours.length,
//     data: {
//       tours: tours,
//     },
//   });
// });

// // GET SINGLE

// app.get(`/api/v1/tours/:id`, (req, res) => {
//   const id = req.params.id * 1;

//   const tour = tours.find((el) => el.id === id);

//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid Data',
//     });
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// });

// // POST REQUEST

// app.post(`/api/v1/tours`, (req, res) => {
//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newId }, req.body);
//   tours.push(newTour);

//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tours: tours,
//         },
//       });
//     },
//   );
// });

// // PATCH REQUEST

// app.patch(`/api/v1/tours/:id`, (req, res) => {
//   const id = Number(req.params.id);
//   const tourIndex = tours.findIndex((el) => el.id === id);

//   if (tourIndex === -1) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid Id',
//     });
//   }

//   tours[tourIndex] = { ...tours[tourIndex], ...req.body };

//   fs.writeFileSync(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//   );

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour: tours[tourIndex],
//     },
//   });
// });

// // DELETE REQUEST

// app.delete(`/api/v1/tours/:id`, (req, res) => {
//   const id = Number(req.params.id);
//   const tourIndex = tours.findIndex((el) => el.id === id);

//   if (tourIndex === -1) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid Id',
//     });
//   }

//   tours.splice(tourIndex, 1);
//   fs.writeFileSync(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//   );

//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`App Running on port no ${port}...`);
// });

//=======================================================================
