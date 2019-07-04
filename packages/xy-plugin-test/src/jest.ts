const jest = require('jest');

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
const config = _objectSpread({
  transform: {
    '^.+\\.js$': require.resolve('babel-jest'),
    '\\.(vue)$': require.resolve('vue-jest'),
  },
  transformIgnorePatterns: ['node_modules'],
  testMatch: ['**/?*.(spec|test|e2e).(j|t)s?(x)'],
  moduleFileExtensions: ['js', 'jsx', 'vue', 'json'],
  testPathIgnorePatterns: ['/node_modules/'],
});
async function run(cmd) {
  new Promise((resolve, reject) => {
    jest
      .runCLI(
        _objectSpread({
          config: JSON.stringify(config),
          ...cmd,
          colors: true,
          runInBand: true,
        }),
        ['./src'],
      )
      .then(result => {
        const results = result.results;

        if (results.success) {
          resolve();
        } else {
          reject(new Error('Jest failed'));
        }
      })
      .catch(e => {
        console.log(e);
      });
  });
}

export default run;
