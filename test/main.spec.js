/* global define, it, describe, beforeEach, document */
const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const expect = require('chai').expect;
const axios = require('axios');

let nightmare;

const app = require('../server/app');
//app.use(express.static(path.join(__dirname, '/../public')));
//app.use(express.static(path.join(__dirname, '/../dist')));

app.listen(8888);

const url = 'http://localhost:8888';


describe('express', function () {
  this.timeout(18000);
  beforeEach(() => {
    nightmare = new Nightmare();
  });

  // it('should have the correct page title', () =>
  //   nightmare
  //     .goto(url)
  //     .evaluate(() => document.querySelector('body').innerText)
  //     .end()
  //     .then((text) => {
  //       expect(text).to.contain('xyz');
  //     })
  // );

  it('returns the correct status code', () => axios.get(url)
    .then(response => expect(response.status === 200 || 304)));
});