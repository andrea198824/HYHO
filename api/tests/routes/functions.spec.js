'use strict'
const { expect } = require('chai');

const {
    getApiInfo,
    apiInfoAdapter,
  } = require('../../src/routes/functions');
    
xdescribe('getApiInfo()', function() {
    it('it should return a 172 length array', function(done) {
        getApiInfo()
        .then(function(value) {
            expect(value).to.have.lengthOf(172);
            done()
        })
    });
    it('it should return the image key', function(done) {
        getApiInfo()
        .then(function(values) {
            let keys = Object.keys(values[0])
            let result = keys.filter(value => value == "image");
            expect(result).to.have.lengthOf(1);
            done()
        })
    });
    it('it should return the life_span key', function(done) {
        getApiInfo()
        .then(function(values) {
            let keys = Object.keys(values[0])
            let result = keys.filter(value => value == "life_span");
            expect(result).to.have.lengthOf(1);
            done()
        })
    });
    it('it should return the temperament key', function(done) {
        getApiInfo()
        .then(function(values) {
            let keys = Object.keys(values[0])
            let result = keys.filter(value => value == "temperament");
            expect(result).to.have.lengthOf(1);
            done()
        })
    });
    it('it should return the weight key', function(done) {
        getApiInfo()
        .then(function(values) {
            let keys = Object.keys(values[0])
            let result = keys.filter(value => value == "weight");
            expect(result).to.have.lengthOf(1);
            done()
        })
    });
    it('it should return the height key', function(done) {
        getApiInfo()
        .then(function(values) {
            let keys = Object.keys(values[0])
            let result = keys.filter(value => value == "height");
            expect(result).to.have.lengthOf(1);
            done()
        })
    });
    it('it should return the name key', function(done) {
        getApiInfo()
        .then(function(values) {
            let keys = Object.keys(values[0])
            let result = keys.filter(value => value == "name");
            expect(result).to.have.lengthOf(1);
            done()
        })
    });
    it('it should return the id key', function(done) {
        getApiInfo()
        .then(function(values) {
            let keys = Object.keys(values[0])
            let result = keys.filter(value => value == "id");
            expect(result).to.have.lengthOf(1);
            done()
        })
    });
});

xdescribe('apiInfoAdapter()', function() {
    it('it should return a 172 length array', function(done) {
        apiInfoAdapter()
        .then(function(value) {
            console.log(value)
            done()
        })
    });
});




  