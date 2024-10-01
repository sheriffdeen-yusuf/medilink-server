const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((connection) => console.log('MongoDB MediLink connection established'))
  .catch((err) => console.log(err, 'Failed to connect to Db'));

const app = require('./app');

const port = process.env.PORT || '8001';
app.listen(port, () => {
  console.log(`Medilink server is running at ${port}`);
});
