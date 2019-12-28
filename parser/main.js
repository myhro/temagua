const cheerio = require('cheerio');
const request = require('request-promise');

function exit(msg) {
  console.log(msg);
  process.exit(1);
}

function numericKeys(o) {
  return Object.keys(o).filter(k => !isNaN(k));
}

function parseRow($, cols) {
  let text = '|';
  for (const i of numericKeys(cols)) {
    text +=
      $(cols[i])
        .text()
        .trim() + '|';
  }
  return text;
}

async function main() {
  if (process.argv.length < 3) {
    exit('Usage: node main.js <url>');
  }

  let content;
  try {
    const url = process.argv[2];
    content = await request.get({ uri: url });
  } catch (e) {
    exit(e.message);
  }

  const $ = cheerio.load(content);
  const table = $('table')['2'];
  const rows = $(table).find('tr');
  for (const i of numericKeys(rows)) {
    const cols = $(rows[i]).find('td');
    console.log(parseRow($, cols));
  }
}

main();
