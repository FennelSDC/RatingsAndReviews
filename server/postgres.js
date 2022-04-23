const { Client } = require('pg');

exports.client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: '123456',
  database: 'fennel',
  port: 5432,
});
