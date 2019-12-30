import { checkInterruption, checkOutdated } from './check';
import response from './response';

export async function getInterruption(url) {
  let params = url.searchParams;
  let region = parseInt(params.get('region'));

  if (Number.isNaN(region) || region === null) {
    return response({ error: 'not a valid region' }, 400);
  }

  let outdated = await checkOutdated();
  let res = {};
  if (outdated) {
    res['error'] = 'database is out of date';
    res['outdated'] = true;
    return response(res, 409);
  }

  res['interrupted'] = await checkInterruption(region);
  res['region'] = region;

  return response(res);
}
