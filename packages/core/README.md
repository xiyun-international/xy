```ts
// 注册插件服务
const service = new Service({
  plugins: [
    'block': function block() {}
  ]
})
// plugins 属性就具备这种格式
service.plugins = ['block' : function () {}, 'create': function () {}];


class Service {
  constructor({ plugins }) {
    plugins.forEach(plugin => {
      this.register(plugin)
    });
  }

  register(name, ) {
    // name: block
    // block 方法对应实现的逻辑
  }

  registerCommand() {

  }

}



// 提供的方法
service.getPlugin('block') -> function ()
service.getPlugin('create') -> function ()






```
