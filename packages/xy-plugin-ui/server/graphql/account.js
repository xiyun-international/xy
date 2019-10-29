const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const { ResponseMsgType } = require('./common-types/index');

const AccountType = new GraphQLObjectType({
  name: 'Account',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const api = {
  query: {
    // 获取账户
    accounts: {
      type: new GraphQLList(AccountType),
      args: {
        name: { type: GraphQLString },
      },
      resolve(root, params) {
        console.log(params, 'params');
        const { name } = params;
        const fakeDb = [{ id: 0, name: 'lijian', age: 18 }];
        return fakeDb;
      },
    },
  },
  mutation: {
    updateAccount: {
      type: ResponseMsgType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(root, params) {
        console.log(params, 'params');

        return {
          msg: '操作成功',
          code: 200,
        };
      },
    },
  },
};

module.exports = api;
