const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const ResponseMsgType = new GraphQLObjectType({
  name: 'ResponseMsg',
  fields: {
    code: { type: GraphQLInt },
    msg: { type: GraphQLString },
  },
});

module.exports = {
  ResponseMsgType,
};
