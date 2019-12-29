/* global DB,global,it */

import assert from 'assert';

import Database from './database';
import { checkInterval, regionStatus } from '../src/check';

global.DB = new Database();
DB.load();

it('checks for a whole day of interruptions', async function() {
  let tests = [
    { date: '2019-11-18 00:00:00-03:00', region: 1 },
    { date: '2019-11-18 03:00:00-03:00', region: 1 },
    { date: '2019-11-18 06:00:00-03:00', region: 1 },
    { date: '2019-11-18 09:00:00-03:00', region: 1 },
    { date: '2019-11-18 12:00:00-03:00', region: 1 },
    { date: '2019-11-18 15:00:00-03:00', region: 1 },
    { date: '2019-11-18 18:00:00-03:00', region: 1 },
    { date: '2019-11-18 21:00:00-03:00', region: 1 },
    { date: '2019-11-18 23:59:59-03:00', region: 1 },
  ];
  for (let t of tests) {
    let status = await regionStatus(t.region, t.date);
    let res = checkInterval(status, t.date);
    assert.equal(res, true);
  }
});

it('checks for a whole day of availability', async function() {
  let tests = [
    { date: '2019-11-19 00:00:01-03:00', region: 1 },
    { date: '2019-11-19 03:00:00-03:00', region: 1 },
    { date: '2019-11-19 06:00:00-03:00', region: 1 },
    { date: '2019-11-19 09:00:00-03:00', region: 1 },
    { date: '2019-11-19 12:00:00-03:00', region: 1 },
    { date: '2019-11-19 15:00:00-03:00', region: 1 },
    { date: '2019-11-19 18:00:00-03:00', region: 1 },
    { date: '2019-11-19 21:00:00-03:00', region: 1 },
    { date: '2019-11-19 23:59:59-03:00', region: 1 },
  ];
  for (let t of tests) {
    let status = await regionStatus(t.region, t.date);
    let res = checkInterval(status, t.date);
    assert.equal(res, false);
  }
});

it('checks for availability on holidays', async function() {
  let tests = [
    { date: '2019-12-31 12:00:00-03:00', region: 1 },
    { date: '2020-01-01 12:00:00-03:00', region: 1 },
  ];
  for (let t of tests) {
    let status = await regionStatus(t.region, t.date);
    let res = checkInterval(status, t.date);
    assert.equal(res, false);
  }
});
