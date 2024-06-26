require('dotenv').config();

const dbURI =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI;
let port =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_PORT
    : process.env.PORT

port ||= 4000;

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const courseRoutes = require('./routes/course');
const sessionRoutes = require('./routes/session');
const feedbackRoutes = require('./routes/feedback');
const userRoutes = require('./routes/user');
const { error } = require('console');
const bodyParser = require('body-parser');
const path = require('path');
const i18next = require('./i18n');
const i18nextMiddleware = require('i18next-express-middleware');

// Create express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//configure cors
app.use(cors());

// middleware

app.use(express.json());
app.use(i18nextMiddleware.handle(i18next));

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/courses', courseRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  app.get('/*', function (req, res) {
    res.sendFile(
      path.join(__dirname, '../frontend/build/index.html'),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
  console.log('Serving in production environment');
}

//connect to mongodb
mongoose
  .connect(dbURI)
  .then(() => {
    // listen for requests
    app.listen(port, () => {
      console.log('connected to db & listening on port ' + port);
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
