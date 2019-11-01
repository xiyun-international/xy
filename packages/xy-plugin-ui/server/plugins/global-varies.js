const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const promisify = require('util').promisify;
Object.assign(global, {
  fs,
  _,
  path,
  promisify,
});
