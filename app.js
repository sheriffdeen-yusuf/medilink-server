const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

const authController = require('./controllers/authController');
const userRouter = require('./routes/userRoutes');
const bcRouter = require('./routes/bcRoutes');
const cardiovascularRouter = require('./routes/cardiovascularRoute');
const diabetesRouter = require('./routes/diabetesRoute');
const pregnancyRouter = require('./routes/pregnancyRoute');

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'Successful',
    message: 'You have successfully hit MediLink Server',
  });
});

app.route('/api/v1/securePing').get(authController.protect, authController.ping);
app.route('/api/v1/auth/signup').post(authController.signup);
app.route('/api/v1/auth/login').post(authController.login);

app.use('/api/v1/takenAssessment', userRouter);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/stratification/breastCancer', bcRouter);
app.use('/api/v1/stratification/cardiovascular', cardiovascularRouter);
app.use('/api/v1/stratification/diabetes', diabetesRouter);
app.use('/api/v1/stratification/pregnancy', pregnancyRouter);

module.exports = app;
