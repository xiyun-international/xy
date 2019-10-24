// 官方库
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

module.exports = function(app) {
  const schema = buildSchema(`
    type RandomDie {
      numSides: Int!
      rollOnce: Int!
      roll(numRolls: Int!): [Int]
    }
    type Book {
      title: String
      author: String
    }
    type Query {
      hello: String
      quoteOfTheDay: String
      random: Float!
      rollThreeDice: [Int]
      rollDice(numDice: Int!, numSides: Int): [Int]
      getDie(numSides: Int): RandomDie
      books: [Book]
    }
  `);

  const books = [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
  ];
  const root = {
    books: () => {
      return books;
    },
    hello: () => {
      return 'Hello world!';
    },
    quoteOfTheDay: () => {
      return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
    },
    random: () => {
      return Math.random();
    },
    rollThreeDice: () => {
      return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
    },
    rollDice: function({ numDice, numSides }) {
      var output = [];
      for (var i = 0; i < numDice; i++) {
        output.push(1 + Math.floor(Math.random() * (numSides || 6)));
      }
      return output;
    },
    getDie: function({ numSides }) {
      return new RandomDie(numSides || 6);
    },
    ip: function(args, request) {
      return request.ip;
    },
  };

  app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    }),
  );
};
