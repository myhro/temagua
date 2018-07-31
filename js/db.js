import { addElem, fetchText, parseDate } from './helpers';
import dbData from '../data/db.json';

function addEntry(db, region, start_date, start_hour, end_date, end_hour) {
  let start = parseDate(start_date, start_hour);
  let end = parseDate(end_date, end_hour);
  let interval = {'start': start, 'end': end};
  region = Number(region.split(' ')[1]);
  addElem(db, region, interval);
}

export function fillDb(url, db = null) {
  return fetchText(url).then(table => {
    if (db == null) {
      let db = {};
    }
    let lines = table.trim().split('\n');
    for (let l of lines) {
      let columns = l.split('|');
      let region = columns[2].trim();
      let start_date = columns[3].trim();
      let start_hour = "22h";
      let end_date = columns[6].trim();
      let end_hour = columns[7].trim();
      addEntry(db, region, start_date, start_hour, end_date, end_hour);
    }
    return db;
  });
}

export function loadDb() {
  for (let r of Object.keys(dbData)) {
    for (let i of dbData[r]) {
      i.start = new Date(i.start);
      i.end = new Date(i.end);
    }
  }
  return dbData;
}
