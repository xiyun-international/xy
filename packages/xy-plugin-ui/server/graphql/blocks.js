const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType,
} = require('graphql');

const { ResponseMsgType } = require('./common-types/index');

// 请求 - 分页信息类
const PaginationInputType = new GraphQLInputObjectType({
  name: 'PaginationInput',
  fields: {
    current: { type: GraphQLInt },
    total: { type: GraphQLInt },
    pageSize: { type: GraphQLInt },
  },
});

// 请求 - 搜索参数信息类
const QueryType = new GraphQLInputObjectType({
  name: 'QueryType',
  fields: {
    mainType: { type: GraphQLString },
    libraryType: { type: GraphQLString },
    categories: { type: new GraphQLList(GraphQLString) },
    keyword: { type: GraphQLString },
  },
});

// 响应 - 分页信息类
const PaginationType = new GraphQLObjectType({
  name: 'Pagination',
  fields: {
    current: { type: GraphQLInt },
    total: { type: GraphQLInt },
    pageSize: { type: GraphQLInt },
  },
});

// 单个区块类
const BlockType = new GraphQLObjectType({
  name: 'Block',
  fields: {
    name: { type: GraphQLString },
    title: { type: GraphQLString },
    categories: { type: new GraphQLList(GraphQLString) },
    screenshot: { type: GraphQLString },
    version: { type: GraphQLString },
    repository: { type: GraphQLString },
  },
});

// 响应 - 响应信息类
const BlocksResponseType = new GraphQLObjectType({
  name: 'BlocksResponse',
  fields: {
    data: { type: new GraphQLList(BlockType) },
    pagination: { type: PaginationType },
  },
});

const api = {
  query: {
    // 获取区块
    blocks: {
      type: BlocksResponseType,
      args: {
        query: { type: QueryType },
        // 分页
        pagination: { type: PaginationInputType },
      },
      resolve(root, params) {
        const rawBlocks = require('../public/blocks-data.json');

        // 处理成标准格式数据(建议修改源数据)
        let blocks = [];
        _.forIn(rawBlocks, (subBlocks, libraryType) => {
          subBlocks.forEach(block => {
            block.libraryType = libraryType;
          });
          blocks.push(...subBlocks);
        });

        // 数据筛选
        const { libraryType, categories, keyword } = params.query || {};
        blocks = _.filter(blocks, block => {
          const flag =
            // 组件库类型
            (!libraryType || block.libraryType === libraryType) &&
            // 功能类别
            (!categories ||
              !categories.length ||
              _.intersection(block.categories, categories).length) &&
            // 关键字 title
            (!keyword ||
              !keyword.length ||
              _.intersection(block.title.split(''), keyword.split('')).length);
          return flag;
        });

        // 数据分页
        const { current, pageSize } = params.pagination || {};
        const blocksGroups = _.chunk(blocks, +pageSize);
        const resultData = blocksGroups[+current - 1];

        return {
          data: resultData,
          pagination: {
            total: blocks.length,
          },
        };
      },
    },
  },
  mutation: {
    downloadBlock: {
      type: ResponseMsgType,
      args: {
        name: { type: GraphQLString },
        repository: { type: GraphQLString },
      },
      resolve(root, params) {
        console.log(params, 'params');
        const { name: blockName, repository } = params;

        const containerDir = 'blocks';

        if (
          fs.existsSync(path.resolve(process.cwd(), containerDir, blockName))
        ) {
          return {
            code: 500,
            msg: '区块已经存在 !!!',
          };
        }

        socket.emit('task-info', `正在下载: ${blockName} 到当前项目......`);

        return new Promise((resolve, reject) => {
          const child_process = require('child_process');

          const workerProcess = child_process.exec(
            `xy block ${repository} --path ./${containerDir}/${blockName}`,
            {
              // 指定一下执行环境, 便于开发测试
              cwd: process.cwd(),
            },
            function(error, stdout, stderr) {
              if (error) {
                console.log('error ----', error);
                reject({
                  code: 500,
                  msg: '下载失败 !!!',
                });
              }
              console.log('stdout ---- ' + stdout);
              socket.emit('task-finish', stdout);

              console.log('stderr ---- ' + stderr.message);
            },
          );

          workerProcess.on('exit', function(code) {
            resolve({
              code: 200,
              msg: '下载成功',
            });
          });
        });
      },
    },
  },
};

module.exports = api;
