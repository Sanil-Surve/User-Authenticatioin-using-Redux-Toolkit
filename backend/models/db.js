const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const url = process.env.MONGOURI;

mongoose.connect(url)
.then(() => {
  console.log('Database connected');
})
.catch(err => console.log(err.message));
