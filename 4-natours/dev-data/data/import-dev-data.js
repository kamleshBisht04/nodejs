const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const Tour = require('../../models/tourModels');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then((con) => {
    console.log(con.connections);
    console.log('DB connection successful!');
  })
  .catch((err) => console.log('❌ DB error:', err.message));

// READ JSON FILE

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

// IMPORT DATA INTO DB

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log(`Data successfully loaded!..`);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB..
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log(`Data successfully Deleted!..`);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// deleteData();
// importData();

// through cmd this will return the array of argument
console.log(process.argv);

if (process.argv[2] === '--importData') {
  importData();
}

if (process.argv[2] === '--deleteData') {
  deleteData();
}
