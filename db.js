const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const DB_URI = process.env.DB_URI.replace(
  '<dbname>',
  process.env.DB_NAME
).replace('<password>', process.env.DB_PASS);

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Database connected ✅');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
