import { hasWater, waterStatus } from './backend';
import { neighborhoods } from './neighborhoods';

export async function checkNeighborhood() {
  let n = document.getElementById('neighborhood-input').value;
  if (neighborhoods.hasOwnProperty(n)) {
    showElement('water-loading');
    await checkRegion(neighborhoods[n]);
    hideElement('water-loading');
  }
}

async function checkRegion(region) {
  let status = await hasWater(region);
  switch (status) {
    case waterStatus.AVAILABLE:
      hideAll();
      showElement('water-available');
      break;
    case waterStatus.UNAVAILABLE:
      hideAll();
      showElement('water-unavailable');
      break;
    case waterStatus.OUTDATED:
      hideAll();
      showElement('water-outdated');
      break;
    default:
      hideAll();
      showElement('water-error');
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

export function clearSearch() {
  let input = document.getElementById('neighborhood-input');
  input.value = '';
  hideAll();
}

function hideAll() {
  hideElement('water-available');
  hideElement('water-error');
  hideElement('water-loading');
  hideElement('water-outdated');
  hideElement('water-unavailable');
}

function hideElement(name) {
  changeVisibility(name, false);
}

function showElement(name) {
  changeVisibility(name, true);
}
