import { getInterruption } from './interruption';
import response from './response';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  let url = new URL(request.url);
  let routes = {
    routes: ['/interruption'],
  };

  if (url.pathname.startsWith('/interruption')) {
    return getInterruption(url);
  }

  return response(routes);
}
