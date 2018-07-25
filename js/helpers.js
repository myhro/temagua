export function addElem(obj, key, value) {
  if (obj.hasOwnProperty(key)) {
    obj[key].push(value);
  } else {
    obj[key] = [value];
  }
}

export function fetchText(url) {
  return fetch(url).then(response => {
    return response.text();
  }).then(text => {
    return text;
  });
}

function hasWater(db, region, time = new Date()) {
  for (let i of db[region]) {
    if (time > i.start && time < i.end) {
      return false;
    }
  }
  return true;
}

export function parseDate(date, time) {
  let [day, month, year] = date.split('/');
  month -= 1
  let hour = time.split('h')[0];
  let offset = 3;
  hour = Number(hour) + offset;
  return new Date(Date.UTC(year, month, day, hour));
}
