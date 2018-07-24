document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('.autocomplete');
  let list = {};
  for (let n of Object.keys(neighborhoods)) {
    list[n] = null;
  }
  let options = {data: list};
  let instances = M.Autocomplete.init(elems, options);
});

function checkNeighborhood() {
  let n = document.getElementById('neighborhood-input').value;
  if (neighborhoods.hasOwnProperty(n)) {
    checkRegion(neighborhoods[n]);
  }
}

function checkRegion(region) {
  let available = document.getElementById('water-available');
  let unavailable = document.getElementById('water-unavailable');

  let waterCheck = hasWater(db, region);
  if (waterCheck == true) {
    available.classList.remove('hide');
    unavailable.classList.add('hide');
  }
  else {
    available.classList.add('hide');
    unavailable.classList.remove('hide');
  }
}
