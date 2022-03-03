/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const { after } = require('mocha');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Temperament, Breed, conn } = require('../../src/db.js');
let Dog = Breed
const agent = session(app);
const dog = {
          name: "Pug",
          height: "Height",
          weight: "Weight",
          temperament: [" "]
};
const badDog = {
  name: "Pug"
};

describe('Test de APIS', () => {
  after(async function() {
    await conn.sync({ force: true });
    conn.close();
  });
  before(() => Breed.sync({ force: true }));
  before(() => Temperament.sync({ force: true }));
  describe('GET /temperament', () => {
    it('GET responds with 200', () => agent.get('/temperament').expect(200));
    it('GET responds with an array with all the external api`s temperaments', () =>
        agent.get('/temperament').then((res) => {
          expect(res.body).to.have.lengthOf(124);
        }));
  });
  xdescribe('GET /dogs', () => {
    it('GET responds with 200', () => agent.get('/dogs').expect(200));
    it('GET responds with an array with all the external api`s breeds  `hola`', () =>
        agent.get('/dogs').then((res) => {
          expect(res.body).to.have.lengthOf(172);
        }));
  });
  xdescribe('POST /dog', () => {
    it('POST responds with 400 if theres is no res.body', () => agent.post('/dog').expect(400));
    it('POST responds with `Not enougth info` after sending incomplete info', () =>
      agent.post('/dog')
        .send(badDog)
        .then((res) => {
          expect(res.body.message).equal("Not enougth info");
        })
    );
    it('POST responds with dog name', () =>

      agent.post('/dog')
      .send(dog)
      .then((res) => {
        expect(res.body.name).to.deep.equal("Pug");
        })

  );

  });
  
});
