const express = require('express')
const app = express()
const request = require('request')
const authHeader = {
  'auth': {
    'bearer': 'BQD1n3QLCSFV4pECIk9BTz7sh46uzhSJP0eJNuz3OA76uUd9HEbOzSK1naT0WerHHyZw3_b_Hf1oGthLe6w3l5wiVdesX6mqHtDIPN2Apum8FtttvObe8Yf7aRxxBOoHjvYrOelfNGBtDmVo6DdsQDCDYAntKmqbOzjWJgPrkKc1dJ-6v-hgmto_HYd5dxLSfhRP7NXEdXMfMCe4eW3pLpKBvqIQjzPx3IQ_0AaddyxYLV5eOvJKvWSBRB7hJ4g7nw'
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
