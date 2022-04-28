const { Client } = require('pg');
require('dotenv').config();
exports.client = new Client({
  host: 'ec2-3-90-58-40.compute-1.amazonaws.com',
  user: process.env.user,
  password: process.env.password,
  database: 'fennel',
});

//artillery quick --count 20 --num 10 http://ec2-3-90-58-40.compute-1.amazonaws.com:3000/reviews/1
