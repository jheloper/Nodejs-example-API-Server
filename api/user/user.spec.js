const should = require('should');
const request = require('supertest');
const app = require('../../app');

describe('GET /users', () => {
  it('should return 200 status code', (done) => {
    //assert.equal(false, true);
    //(true).should.be.equal(true);
    request(app).get('/users').expect(200).end((err, res) => {
      if (err) throw err;
      res.body.should.be.an.instanceOf(Array);
      res.body.should.have.length(3);
      console.log(res.body);
      done();
    })
  });
});

describe('GET /users/:id', () => {
  it('should return user object', (done) => {
    request(app).get('/users/1').expect(200).end((err, res) => {
      if (err) throw err;
      res.body.should.have.property('id', 1);
      res.body.should.have.property('name', 'alice');
      console.log(res.body);
      done();
    })
  });

  it('should return 400 status code with string id', (done) => {
    request(app).get('/users/abc').expect(400).end((err, res) => {
      if (err) throw err;
      res.body.should.have.property('error');
      console.log(res.body);
      done();
    })
  });

  it('should return 404 status code with no id', (done) => {
    request(app).get('/users/100').expect(404).end((err, res) => {
      if (err) throw err;
      res.body.should.have.property('error');
      console.log(res.body);
      done();
    })
  });
});

describe('POST /users', () => {
  it('should return new user object', (done) => {
    request(app).post('/users').expect(201).send({name: 'jack'}).end((err, res) => {
      if (err) throw err;
      res.body.should.have.properties('id', 'name');
      console.log(res.body);
      done();
    })
  });

  it('should return 400 status code with no name', (done) => {
    request(app).post('/users').expect(400).send().end((err, res) => {
      if (err) throw err;
      res.body.should.have.property('error');
      console.log(res.body);
      done();
    })
  });
});

describe('DELETE /users/:id', () => {
  it('should return 204 status code', (done) => {
    request(app).delete('/users/1').expect(204).end((err, res) => {
      if (err) throw err;
      done();
    })
  });

  it('should return 400 status code', (done) => {
    request(app).delete('/users/abc').expect(400).end((err, res) => {
      if (err) throw err;
      res.body.should.have.property('error');
      console.log(res.body);
      done();
    })
  });

  it('should return 404 status code', (done) => {
    request(app).delete('/users/100').expect(404).end((err, res) => {
      if (err) throw err;
      res.body.should.have.property('error');
      console.log(res.body);
      done();
    })
  });
});
