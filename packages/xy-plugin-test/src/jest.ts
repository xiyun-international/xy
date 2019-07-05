const jest = require('jest');

const config = {
  transform: {
    '^.+\\.js$': require.resolve('babel-jest'),
    '\\.(vue)$': require.resolve('vue-jest'),
  },
  transformIgnorePatterns: ['node_modules'],
  testMatch: ['**/?*.(spec|test|e2e).(j|t)s?(x)'],
  moduleFileExtensions: ['js', 'jsx', 'vue', 'json'],
  testPathIgnorePatterns: ['/node_modules/'],
};
async function run(cmd) {
  new Promise((resolve, reject) => {
    jest
      .runCLI(
        {
          config: JSON.stringify(config),
          ...cmd,
          colors: true,
          runInBand: true,
        },
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
