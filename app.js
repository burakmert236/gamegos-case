const express = require('express');
const helmet = require('helmet'); // for security
const cors = require('cors');

const config = require('./config');
const loader = require('./loaders');

const { EventRoutes } = require('./routes');

config();
loader();

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.options('*', cors());

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${8080}`);
  app.use('/event', EventRoutes);
})
