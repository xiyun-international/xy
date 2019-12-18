module.exports = {
  '/code': function() {
    return Math.random() < 0.1 ? 1 : 0;
  },

  '/api/w': {
    'list|100': [{ 'value|1-100': 50, 'type|0-2': 1 }],
  },
};
