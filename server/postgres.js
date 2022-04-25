const { Client } = require('pg');

exports.client = new Client({
  host: 'ec2-54-226-80-51.compute-1.amazonaws.com',
  user: 'postgres',
  password: 'password',
  database: 'fennel',
  port: 5432,
});
