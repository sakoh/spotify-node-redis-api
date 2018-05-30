const express = require('express')
const app = express()
const request = require('request')
const authHeader = {
  'auth': {
    'bearer': 'BQAl0LV0CO9XdBq3io82-lxDj7oorUlIV771Z7QjrpJHY66xVk2PYDiMcmxXydviUGuIlHbvq1gMtAfuck4v6E0it2YNRZveGx3rTRhtAa9ursu2DHT7CAHJju5NeJNViAwZicIC-lEfURJ6vR3yiwH0vkiE22Bu3pfWQ4rPRFEnFzF61UZDqJ_Z5MblgMmcn1EX8SL9eZTlSSylbFHD3cN-fagSovPvvdinwtSogfQQBFqQDLRyn6rvjeHHza4PXw'
  }
}

app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/api/v1/search-artists/:name', (req, res) => {
  request(`https://api.spotify.com/v1/search?q=${req.params.name}&type=artist`, authHeader, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.json(JSON.parse(response.body))
    }

    res.json(JSON.parse(body))
  })
})

app.get('/api/v1/artists/:id', (req, res) => {
  request(`https://api.spotify.com/v1/artists/${req.params.id}`, authHeader, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.json(JSON.parse(response.body))
    }

    res.json(JSON.parse(body))
  })
})

app.get('/api/v1/artists/:id/related-artists', (req, res) => {
  request(`https://api.spotify.com/v1/artists/${req.params.id}/related-artists`, authHeader, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.json(JSON.parse(response.body))
    }

    res.json(JSON.parse(body))
  })
})

const server = app.listen(3000, () => console.log('listening on http://localhost:3000'))

module.exports = server
