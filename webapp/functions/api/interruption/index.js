import { checkInterruption, checkOutdated } from './check';
import response from '../http/response';

export async function onRequest(context) {
  const res = {};

  const url = new URL(context.request.url);
  const regionParam = url.searchParams.get('region');
  if (regionParam === null || regionParam === '') {
    res['error'] = 'missing region';
    return response(res, 400);
  }

  const region = parseInt(regionParam);
  if (isNaN(region)) {
    res['error'] = 'not a valid region';
    return response(res, 400);
  }

  const outdated = await checkOutdated(context.env.DB);
  if (outdated) {
    res['error'] = 'database is out of date';
    res['outdated'] = true;
    return response(res, 409);
  }

  res['interrupted'] = await checkInterruption(context.env.DB, region);
  res['region'] = region;

  return response(res);
}
