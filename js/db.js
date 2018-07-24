function addEntry(db, region, start_date, start_hour, end_date, end_hour) {
  let start = parseDate(start_date, start_hour);
  let end = parseDate(end_date, end_hour);
  let interval = {'start': start, 'end': end};
  region = Number(region.split(' ')[1]);
  addElem(db, region, interval);
}

async function fillDb() {
  let db = {};
  let table = await fetchText('data/table.txt');
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
}

async function loadDb() {
  let json = await fetchText('data/db.json');
  let db = JSON.parse(json);
  for (let r of Object.keys(db)) {
    for (let i of db[r]) {
      i.start = new Date(i.start);
      i.end = new Date(i.end);
    }
  }
  return db;
}
