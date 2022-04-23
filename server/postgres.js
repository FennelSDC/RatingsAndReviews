const { Client } = require('pg');

exports.client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: '',
  database: 'fennel',
  port: 5432,
});
