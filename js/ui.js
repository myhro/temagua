import { hasWater } from './backend';
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
  let available = await hasWater(region);
  if (available) {
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

export function clearSearch() {
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
