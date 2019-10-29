<template>
  <div>
    <!-- <div class="banner"></div> -->

    <div>当前的 npm包: dependencies:</div>
    <a-card
      :key="depIndex"
      :title="dep.name"
      style="width: 300px"
      v-for="(dep, depIndex) in dependencies"
    >
      <p>{{ dep.version }}</p>
    </a-card>
    <div>{{ depErrMsg }}</div>

    <a-button
      :loading="isInstalling"
      @click="installDep"
      type="primary"
    >安装npm包</a-button>


    <div ref="xterm"></div>

    <!-- <a-button @click='fn'>通过 socket 发送消息 </a-button> -->
  </div>
</template>

<script>
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import io from 'socket.io-client';

export default {
  data() {
    return {
      dependencies: [],
      depErrMsg: "",
      isInstalling: false,

      term: null,
      socket: null,

    };
  },

  async created() {
    this.getDep()
  },

  mounted() {
    this.initSocket()
    this.initXterm()

    this.$get('test').then((res) => {
      console.log(res, 'cwdnode')
    })
  },

  methods: {
    initSocket() {
      this.socket = io.connect("http://localhost:3001")

      // 监听服务端的dialog事件
      this.socket.on("task-info",(data) => {
        this.writeTerm(data)
      })
      this.socket.on("task-finish",(data) => {
        this.writeTerm(data)
        this.startTermNewPart()
      })
    },

    initXterm() {
      this.term = new Terminal({ cols: 100, rows: 10 })
      this.term.open(this.$refs.xterm)
      this.startTermNewPart()
    },

    async getDep() {
      const res = await this.$get("/all-dependencies");
      console.log(res,'get dep')

      const depInfo = res.data.list;

      if (depInfo) {
        if (depInfo.dependencies) {
          this.dependencies = Object.entries(res.data.list.dependencies).map(
            ([key, value]) => {
              return {
                name: key,
                version: value
              };
            }
          );
          console.log(this.dependencies,'this.dependencies')
        }
      } else {
        this.depErrMsg = res.data.errMsg;
      }
    },


    installDep() {
      this.isInstalling = true

      this.$post("add-dependency", {
        dependencies: ["chalk"]
      }).then((res) => {
        console.log(res)
        this.getDep()
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        this.isInstalling = false        
      })
    },

    startTermNewPart() {
      this.writeTerm('---- user $')
    },

    writeTerm(rawStr) {
      const strs = rawStr.split(/\n\r|\n/)
      strs.forEach((str) => {
        this.term.writeln(str)
      })
    },

    // fn() {
    //   // 发送一个事件到服务端
    //   this.socket.emit('dialog','hello from 客户端')
    // },
  }
};
</script>

<style lang="less" scoped>
  .banner {
    width: 100%;
    height: 300px;
    background: #6875E9;
  }
</style>