const app = require('express')()

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(3000, () => console.log('listening on http://localhost:3000'))
