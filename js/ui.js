document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('select');
  let options = {classes: '', dropdownOptions: {}};
  let instances = M.FormSelect.init(elems, options);
});

function checkRegion() {
  let available = document.getElementById('water-available');
  let region = document.getElementById('regions').value;
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
