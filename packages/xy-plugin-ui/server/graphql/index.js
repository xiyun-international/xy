module.exports = function(app) {
  const blockApi = require('./blocks');

  // -------------- 查询和变更的定义 --------------
  const { GraphQLObjectType, GraphQLSchema } = require('graphql');
  const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      ...blockApi.query,
      ...blockApi.mutation,
    },
  });

  // const MutationType = new GraphQLObjectType({
  //   name: "Mutation",
  //   fields: {
  //     ...accountApi.mutation,
  //   }
  // });

  const schema = new GraphQLSchema({
    query: QueryType,
    // mutation: MutationType,
  });

  // 调用graphql中间件
  const graphqlHTTP = require('express-graphql');
  app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      // 是否使用graphql的调试界面
      graphiql: true,
    }),
  );
};
