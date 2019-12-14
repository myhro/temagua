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

export async function hasWater(region) {
  let res = await fetch(process.env.API_URL + '/interruption?region=' + region);
  let json = await res.json();
  return !json['interrupted'];
}

export function parseDate(date, time) {
  let [day, month, year] = date.split('/');
  month -= 1;
  let hour = time.split('h')[0];
  let offset = 3;
  hour = Number(hour) + offset;
  return new Date(Date.UTC(year, month, day, hour));
}
