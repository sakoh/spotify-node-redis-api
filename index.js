const express = require('express')
const app = express()
const request = require('request')
const authHeader = {
  'auth': {
    'bearer': 'BQBV9RR0Gh23iBtx5AUc2VdWeHIl5VTHudSjhWhDEd4MfU3yhFjmJGj60vL2XrJpP_3eWegUIHeclhD9IaNoqfC9dUaFYwA_Qc4SmoG3jKbCeCcx00ejKWSl8pbCKk7EpQKIJLIqEz5JBpnLB3na9b6EOANZXvmc5vVBU7u5pfduS5kaq_CVdCMser8gYgIij6aJzU251Dy4E5QpM-11MgjBu36UXGYbFDIAfUrcSVxgpxWGnfZ9U7hszJLgV9048A'
  }
}

app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/api/v1/search-artists/:name', (req, res) => {
  request(`https://api.spotify.com/v1/search?q=${req.params.name}&type=artist`, authHeader, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return console.log('Error occurred: ' + response.body.message)
    }
  
    res.json(JSON.parse(body))
  })
})

app.get('/api/v1/artists/:id', (req, res) => {
  request(`https://api.spotify.com/v1/artists/${req.params.id}`, authHeader, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return console.log('Error occurred: ' + response.body.message)
    }
  
    res.json(JSON.parse(body))
  })
})

app.get('/api/v1/artists/:id/related-artists', (req, res) => {
  request(`https://api.spotify.com/v1/artists/${req.params.id}/related-artists`, authHeader, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return console.log('Error occurred: ' + response.body.message)
    }
  
    res.json(JSON.parse(body))
  })
})

const server = app.listen(3000, () => console.log('listening on http://localhost:3000'))

module.exports = server
