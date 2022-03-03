/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Breed, conn } = require('../../src/db.js');
let Dog = Breed
const agent = session(app);
const dog = {
          name: "Pug",
          height: "Height",
          weight: "Weight"
};

xdescribe('Dogs routes', (done) => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', (done) =>
      agent.get('/dogs').expect(200).then(() => {done()})
      
    );
  });
  
});
