const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();
const { getReviews, getMetaData, postReview, postHelpful, postReport } = require('../db/queries');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/client/dist')));

// app.all('/*', (req, res) => {
//   const { method, url, body: data, query: params } = req;

//   if (url === '/favicon.ico') {
//     return res.status(204).end();
//   }

//   const optionsUrl = `${process.env.APIURL}${url.split('?')[0]}`;
//   console.log(`Serving ${req.method} to ${url}`);

//   const options = {
//     method,
//     url: optionsUrl,
//     headers: { Authorization: process.env.APITOKEN },
//     data,
//     params,
//   };

//   return axios(options)
//     .then((response) => {
//       res.status(200).send(response.data);
//     })
//     .catch((err) => {
//       res.status(500).end();
//       // console.error(err);
//     });
// });

app.get('/', (req, res) => {
  res.json({ info: 'SDC' });
});

app.get('/products/:productId', (req, res) => {
  const id = req.params.productId;

  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${id}`,
    headers: { Authorization: process.env.APITOKEN },
  };

  return axios(options)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(500).end();
      // console.error(err);
    });
});

app.get(`/products/:productId/styles`, (req, res) => {
  const id = req.params.productId;

  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${id}/styles`,
    headers: { Authorization: process.env.APITOKEN },
  };

  return axios
    .get(options.url, options.headers)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(500).end();
      // console.error(err);
    });
});

app.get('/reviews/:productId', (req, res) => {
  const id = parseInt(req.params.productId);
  getReviews(id, (result) => {
    res.send(result);
  });
});

app.get('/reviews/:productId/meta', (req, res) => {
  const id = parseInt(req.params.productId);
  getMetaData(id, (result) => {
    res.send(result);
  });
});

app.post('/reviews/:productId', (req, res) => {
  const id = parseInt(req.params.productId);
  postReview(req.body, id);
});

app.put('/reviews/:reviewId/helpful', (req, res) => {
  const id = parseInt(req.params.reviewId);
  postHelpful(id);
});

app.put('http://localhost:4321/reviews/:reviewId/report', (req, res) => {
  const id = parseInt(req.params.reviewId);
  postReport(id);
});

//loader

app.get('/loaderio-b4ddefbb827771424eee205f1b1b4690/', (req, res) => {
  res.sendFile('/Users/joshuason/Desktop/loaderio-b4ddefbb827771424eee205f1b1b4690.txt');
});

const PORT = 4321;

app.listen(PORT, () => {
  console.log('listening on PORT ' + PORT);
});
