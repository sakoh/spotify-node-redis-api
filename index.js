const express = require('express')
const app = express()
const axios = require('axios')
const authBearer = 'BQBd6QDnFfVjx3DyW0Nxmerkivnn2I4omUjaIu0uStR1ua0eI5SPVRVMKjPcxhJWi5DJGK224u_9nIZv_F6b97CPYNaPSzxSOac6TOsjVNLudYLOljp13R2BORoM9ftc9VBewdb1uBFgsWUPjFuwGZ5z7YksQSlEWwLPvRi07GPWYKU8sCWxwN0UK42vaQNFFa98cFw78mxN5wD_ujAm7t7vwo0CyzeIz0t8z577vmECDDg7ZAnAR2a0mpEsQu-_kQ'
const axiosInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authBearer}`,
  },
})

app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/api/v1/search-artists', (req, res) => {
  axiosInstance.get(`search?q=${req.query.q}&type=artist`)
    .then(({ data }) => res.send(data))
    .catch(e => res.send(e.response.data))
})

app.get('/api/v1/artists/:id', (req, res) => {
  axiosInstance.get(`artists/${req.params.id}`)
    .then(({ data }) => res.json(data))
    .catch(e => res.send(e.response.data))
})

app.get('/api/v1/artists/:id/related-artists', (req, res) => {
  axiosInstance.get(`artists/${req.params.id}/related-artists`)
    .then(({ data }) => res.send(data))
    .catch(e => { res.send(e.response.data) })
})

const server = app.listen(3000, () => console.log('listening on http://localhost:3000'))

module.exports = server
