import { loadDb } from './db';
import { neighborhoods } from './neighborhoods';
import { checkNeighborhood, clearSearch } from './ui';

function initMaterialize() {
  let elems = document.querySelectorAll('.autocomplete');
  let list = {};
  for (let n of Object.keys(neighborhoods)) {
    list[n] = null;
  }
  let options = {data: list};
  let instances = M.Autocomplete.init(elems, options);
}

function setupEvents() {
  let input = document.getElementById('neighborhood-input');
  input.onchange = checkNeighborhood;
  input.onfocus = clearSearch;
}

document.addEventListener('DOMContentLoaded', function() {
  initMaterialize();
  setupEvents();
});

window.db = loadDb();
