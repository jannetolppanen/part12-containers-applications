const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { getAsync, setAsync } = require('./redis');

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');

const app = express();

const initializeRedisCounter = async () => {
  const addedTodos = await getAsync('added_todos');
  if (addedTodos === null) {
    console.log('Initializing added_todos in Redis with value 0');
    await setAsync('added_todos', 0);
  }
};

// alustetaan redis
initializeRedisCounter();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/todos', todosRouter);

// /statistics route
app.get('/statistics', async (req, res) => {
  const addedTodos = (await getAsync('added_todos'));
  return res.json({ added_todos: parseInt(addedTodos) });
});

module.exports = app;
