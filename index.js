const express = require('express')
const app = express()
const axios = require('axios')
const authBearer = 'BQD3Ia4ZG-YX2if3LHn0X1IOpvqRLKbXUeIUznsmhl7rEijLXFRCGnipq34pghx4WuSmeEE3joemJJSrI76_zaUoC5sjDskC-frLTAa4vNluJkXnGJuqz9hat-oPt7U6ZfV8jp9sLcsRvAqN_AY5nuSCEK7gVDqU5w2kBk_dMgY5PSvoK0ZAku5HQNU9zShEJjUHd6iRKz8lZhZHt3J3xPQjkFXw9Qrw2R33JnOSqIwqSaY3SlwmYj7tqIP7UI1niA'
const axiosInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authBearer}`,
  },
})
const redis = require('redis')
const rclient = redis.createClient()
const slugify = require("underscore.string/slugify")

const getFromRedisOrSpotify = (req, res, key, url) => rclient.get(key, (err, rs) => {
  if (rs) {
    res.json(JSON.parse(rs))
  } else {
    axiosInstance.get(url)
      .then(({
        data
      }) => {
        rclient.set(key, JSON.stringify(data))
        res.send(data)
      })
      .catch(e => res.send(e.response.data))
  }
})

app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/api/v1/search-artists', (req, res) => {
  const key = `search--${slugify(req.query.q)}`
  getFromRedisOrSpotify(req, res, key, `search?q=${req.query.q}&type=artist`)
})

app.get('/api/v1/artists/:id', (req, res) => {
  const key = req.params.id
  getFromRedisOrSpotify(req, res, key, `artists/${key}`)
})

app.get('/api/v1/artists/:id/related-artists', (req, res) => {
  const key = `${req.params.id}--related-artists`
  getFromRedisOrSpotify(req, res, key, `artists/${req.params.id}/related-artists`)
})

const server = app.listen(3000, () => console.log('listening on http://localhost:3000'))

module.exports = server
