const { Breed, Temperament, conn } = require('../../src/db.js');
const { expect } = require('chai');

xdescribe('Breed model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Breed.sync({ force: true }));
    
      it('should throw an error if name, height and weight are null', (done) => {
        Breed.create({})
          .then(() => done(new Error('It requires name, height and weight properties')))
          .catch(() => done());
      });
      it('should work when name, height and weight properties are loaded', (done) => {
        Breed.create({
          name: "Pug",
          height: "Height",
          weight: "Weight"
        })
          .then(() => done())
          .catch(() => done(new Error('name, height and weight properties should be mandatory')));
      });
    
  });
});

xdescribe('Temperament model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Temperament.sync({ force: true }));
    
      it('should throw an error if name is null', (done) => {
        Temperament.create({})
          .then(() => done(new Error('It requires a name')))
          .catch(() => done());
      });
      it('should work when name is asigned', (done) => {
        Temperament.create({
          name: "Happy"
        })
          .then(() => done())
          .catch(() => done(new Error('name property should be mandatory')));
      });
    
  });
});
