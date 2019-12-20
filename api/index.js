addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let url = new URL(request.url);
  let routes = {
    'routes': [
      '/interruption',
    ]
  }

  if (url.pathname.startsWith('/interruption')) {
    return getInterruption(url);
  }

  return response(routes);
}

function checkInterval(interval) {
  let hours = interval.split('-');
  let h1 = hours[0];
  let h2 = hours[1];

  let now = new Date();
  let year = now.getUTCFullYear();
  let month = now.getUTCMonth();
  let day = now.getUTCDate();

  let start = new Date(Date.UTC(year, month, day, h1));
  let end = new Date(Date.UTC(year, month, day, h2));

  return now >= start && now <= end;
}

async function checkOutdated() {
  let res = await DB.get('last');

  if (res === null) {
    return false;
  }

  let now = new Date();
  let last = new Date(res);

  return now > last;
}

async function getInterruption(url) {
  let params = url.searchParams;
  let region = parseInt(params.get('region'));

  if (Number.isNaN(region) || region === null) {
    return response({error: 'not a valid region'}, 400);
  }

  let outdated = await checkOutdated();
  let res = {};
  if (outdated) {
    res['error'] = 'database is out of date';
    res['outdated'] = true;
    return response(res, 409);
  }

  res['region'] = region;

  let status = await regionStatus(region);
  if (status === null) {
    res['interrupted'] = false;
  } else if (status == 'all-day') {
    res['interrupted'] = true;
  } else {
    res['interrupted'] = checkInterval(status);
  }

  return response(res);
}

async function regionStatus(region) {
  let now = new Date();
  let date = now.toISOString().split('T')[0];
  let query = `${date}:${region}`;
  let res = await DB.get(query);
  return res;
}

function response(content, status) {
  let headers = new Headers({
   'Access-Control-Allow-Origin': '*',
   'Content-Type': 'application/json',
  });

  if (status === undefined) {
    status = 200;
  }

  let res = new Response(JSON.stringify(content), {headers: headers, status: status});

  return res;
}
