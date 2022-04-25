const { Client } = require('pg');

exports.client = new Client({
  host: '54.235.29.34',
  user: 'postgres',
  password: 'password',
  database: 'fennel',
  port: 5432,
});
