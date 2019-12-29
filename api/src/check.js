/* global DB */

export function checkInterval(interval, datetime) {
  if (interval === null) {
    return false;
  }

  if (datetime !== undefined) {
    datetime = new Date(datetime);
  } else {
    datetime = new Date();
  }

  let [d1, d2] = interval.split('|');
  let start = new Date(d1);
  let end = new Date(d2);

  return datetime >= start && datetime <= end;
}

export async function checkOutdated() {
  let res = await DB.get('last');

  if (res === null) {
    return false;
  }

  let now = new Date();
  let last = new Date(res);

  return now > last;
}

export async function regionStatus(region, datetime) {
  if (datetime !== undefined) {
    datetime = new Date(datetime);
  } else {
    datetime = new Date();
  }

  let date = datetime.toISOString().split('T')[0];
  let query = `${date}:${region}`;
  let res = await DB.get(query);

  return res;
}
