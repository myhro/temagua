document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('.autocomplete');
  let list = {};
  for (let n of Object.keys(neighborhoods)) {
    list[n] = null;
  }
  let options = {data: list};
  let instances = M.Autocomplete.init(elems, options);
});

loadDb().then(db => {
  window.db = db;
});
