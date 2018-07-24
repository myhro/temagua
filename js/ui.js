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
  if (hasWater(db, region)) {
    hideElement('water-unavailable');
    showElement('water-available');
  } else {
    hideElement('water-available');
    showElement('water-unavailable');
  }
}

function changeVisibility(name, show) {
  let elem = document.getElementById(name);
  if (show) {
    elem.classList.remove('hide');
  } else {
    elem.classList.add('hide');
  }
}

function clearSearch() {
  let input = document.getElementById('neighborhood-input');
  input.value = '';
  hideElement('water-available');
  hideElement('water-unavailable');
}

function hideElement(name) {
  changeVisibility(name, false);
}

function showElement(name) {
  changeVisibility(name, true);
}
