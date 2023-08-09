const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

const apiRouter = require('./routes/apiRouter');

//Everything that happens as soon as request comes in
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// serve static assets from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

//route to SQL for any requests to the /places endpoint
app.use('/api', apiRouter);

// serve index.html for any unmatched route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// UNKOWN URL ERROR HANDLER
app.all('*', (req, res, next) => {
  res.status(404).json({
    message: 'An error occurred: invalid URL',
  });
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err.stack);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).send(errorObj.message);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
