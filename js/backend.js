export async function hasWater(region) {
  let res = await fetch(process.env.API_URL + '/interruption?region=' + region);
  let json = await res.json();
  return !json['interrupted'];
}
