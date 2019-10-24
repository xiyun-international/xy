<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
      <div>
        <a-button type="primary" @click="chat">发送 WebSocket 消息</a-button>
      </div>
      <div style="margin: 10px 0">
        <a-button type="primary" @click="request">请求一般的接口</a-button>
      </div>
      <div>
        <a-button type="primary" @click="gfq">请求 graphql 接口</a-button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  data() {
    return {
      ws: new WebSocket(`ws://localhost:8081/ui-ws`)
    };
  },
  mounted() {
    this.ws.onmessage = function(event) {
      console.log(event.data);
    };
  },
  methods: {
    chat() {
      this.ws.send(JSON.stringify({ type: "chat", data: "喂，你收到了吗？" }));
    },
    request() {
      this.$http
        .post("/api/demo", {
          name: "xiaoming"
        })
        .then(res => {
          const {data} = res;
          console.log(data);
        });

      this.$http
        .post("/api/demo/chat", {
          name: "xiaoming"
        })
        .then(res => {
          const {data} = res;
          console.log(data);
        });
    },
    gfq() {
      this.$http
        .post("/graphql", {
          query: `{
            hello
            books{title}
          }`
        })
        .then(res => {
          const {data} = res;
          console.log(data.data);
        });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
