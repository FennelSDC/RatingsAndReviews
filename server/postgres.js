const { Client } = require('pg');

exports.client = new Client({
  host: 'ec2-54-159-123-212.compute-1.amazonaws.com',
  user: '',
  password: '',
  database: 'fennel',
  port: 5432,
});
