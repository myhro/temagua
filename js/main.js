function addElem(obj, key, value) {
  if (obj.hasOwnProperty(key)) {
    obj[key].push(value);
  } else {
    obj[key] = [value];
  }
}

function addEntry(db, region, start_date, start_hour, end_date, end_hour) {
  let start = parseDate(start_date, start_hour);
  let end = parseDate(end_date, end_hour);
  let interval = {'start': start, 'end': end};
  region = Number(region.split(' ')[1]);
  addElem(db, region, interval);
}

function fetchText(url) {
  return fetch(url)
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      return text;
    });
}

function hasWater(db, region, time = Date.now()) {
  for (let i of db[region]) {
    if (time > i.start && time < i.end) {
      return false;
    }
  }
  return true;
}

function parseDate(date, time) {
  let [day, month, year] = date.split('/');
  month -= 1
  let hour = time.split('h')[0];
  let offset = 3;
  hour = Number(hour) + offset;
  return new Date(Date.UTC(year, month, day, hour));
}

async function main() {
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
}

let db = {};
main();
