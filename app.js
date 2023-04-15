const express = require('express');
const fs = require('fs');
const moragn = require('morgan')

const app = express();

app.use(moragn('dev'))

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
}

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message:"This route is not defined yet"
  });
}
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message:"This route is not defined yet"
  });
}
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message:"This route is not defined yet"
  });
}
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message:"This route is not defined yet"
  });
}

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message:"This route is not defined yet"
  });
}

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
          tour: newTour,
        },
      });
    }
  );
}

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((ele) => ele.id === id);

  if(!tour) {
    return res.status(404).json({
      status:'fail',
      message:"Invalid Id"
    })
  }

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tour,
    },
  });
}

const updateTour = (req, res) => {
  if(req.params.id > tours.length) {
    return res.status(404).json({
      status:'fail',
      message:"Invalid Id"
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>',
    },
  });
}

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((ele) => ele.id === id);

  if(req.params.id > tours.length) {
    return res.status(404).json({
      status:'fail',
      message:"Invalid Id"
    })
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
}

// GET TOURS
app.get('/api/v1/tours', getAllTours);

// CREATE TOURS
app.post('/api/v1/tours', createTour);

// GET TOUR
app.get('/api/v1/tours/:id', getTour);


// UPDATE TOUR
app.patch('/api/v1/tours/:id', updateTour)


// DLETE TOUR
app.delete('/api/v1/tours/:id', deleteTour)



const userRouter = express.Router()
const tourRouter = express.Router()


tourRouter.route('/').get(getAllTours).post(createTour)

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

userRouter.route('/').get(getAllUsers).post(createUser)

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
