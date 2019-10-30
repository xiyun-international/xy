const dependencies = require('./dependencies');
const blocks = require('./blocks');

module.exports = app => {
  app.use(dependencies);
  app.use(blocks);
};
