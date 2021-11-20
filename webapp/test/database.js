/* global __dirname */

import fs from 'fs';
import path from 'path';

class Database {
  constructor() {
    this.store = {};
  }

  async get(key) {
    let value = this.store[key];
    if (value === undefined) {
      return null;
    }
    return value;
  }

  load() {
    let dump = path.join(__dirname, '..', 'dump.json');
    let content = fs.readFileSync(dump);
    for (let { key, value } of JSON.parse(content)) {
      this.put(key, value);
    }
  }

  put(key, value) {
    this.store[key] = value;
  }
}

export default Database;
