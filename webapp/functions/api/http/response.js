function response(content, status) {
  let headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  });

  if (status === undefined) {
    status = 200;
  }

  return new Response(JSON.stringify(content), { headers, status });
}

export default response;
