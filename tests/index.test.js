const request = require('supertest')

describe('loading express', function () {
  let server
  beforeEach(function () {
    server = require('..')
  })
  afterEach(function () {
    server.close()
  })
  it('responds to /', function testSlash(done) {
    request(server)
      .get('/')
      .expect(200, done)
  })

  it('responds to /api/v1/search-artists/Kamelot', function testSlash(done) {
    request(server)
      .get('/api/v1/search-artists/Kamelot')
      .expect(200, done)
  })

  it('responds to /api/v1/artists/7gTbq5nTZGQIUgjEGXQpOS', function testSlash(done) {
    request(server)
      .get('/api/v1/artists/7gTbq5nTZGQIUgjEGXQpOS')
      .expect(200, done)
  })

  it('responds to /api/v1/artists/7gTbq5nTZGQIUgjEGXQpOS/related-artists', function testSlash(done) {
    request(server)
      .get('/api/v1/artists/7gTbq5nTZGQIUgjEGXQpOS/related-artists')
      .expect(200, done)
  })


  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done)
  })
})
