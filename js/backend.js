export const waterStatus = {
  AVAILABLE: 1,
  UNAVAILABLE: 2,
  OUTDATED: 3,
  ERROR: 4,
}

export async function hasWater(region) {
  let res;
  try {
    res = await fetch(process.env.API_URL + '/interruption?region=' + region);
  } catch(e) {
    return waterStatus.ERROR;
  }

  if (res.status >= 500) {
    return waterStatus.ERROR;
  }

  let json;
  try {
    json = await res.json();
  } catch(e) {
    return waterStatus.ERROR;
  }

  if (res.status == 200) {
    if (json['interrupted']) {
      return waterStatus.UNAVAILABLE;
    }  else {
      return waterStatus.AVAILABLE;
    }
  } else if (res.status == 409) {
    return waterStatus.OUTDATED;
  }

  return waterStatus.ERROR;
}
