describe('GET /api/v2/recipes?sort=upvotes&order=des', () => {
  it('it should return code 201, username and token', () => {
    chai.request(app)
      .get('/api/v1/recipes')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('array');
        res.body.status.should.equal('Success');
        done();
      });
  });
  describe('GET /api/v2/recipes?sort=upvotes&order=des', () => {
    it('it should return code 200 and popular recipe list', () => {
      chai.request(app)
        .get('/api/v1/recipes?sort=upvotes&order=des')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.be.a('array');
          res.body.status.should.equal('Success');
          done();
        });
    });
  });

})
