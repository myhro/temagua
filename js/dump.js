import { fillDb } from './db';
import tableURL from '../data/table.txt';

fillDb(tableURL).then(db => {
  let output = document.getElementById('db-dump');
  output.innerHTML = JSON.stringify(db);
});
