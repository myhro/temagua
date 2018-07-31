import { fillDb } from './db';
import cw30 from '../data/cw30.txt';
import cw31 from '../data/cw31.txt';

function loadDb() {
  let emptyDb = {};
  fillDb(cw30, emptyDb)
  .then(db => {
    return fillDb(cw31, db);
  })
  .then(db => {
    let output = document.getElementById('db-dump');
    output.innerHTML = JSON.stringify(db);
  });
}

loadDb();
