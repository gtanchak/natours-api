const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successfully'));

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tours must have a name'],
    uniq: true,
  },
  rating: {
    type: Number,
    default: 5.12,
  },
  price: {
    type: Number,
    required: [true, 'A tours must have a price'],
  },
});

console.log(tourSchema);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
