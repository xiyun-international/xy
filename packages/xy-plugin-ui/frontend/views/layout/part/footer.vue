<template>
  <div class="footer">
    <div class="logger-view" :class="xtermVisible?'show-term':'hide-term'">
      <div class="pane-toolbar">
        <div class="title">
          <a-icon type="code" />
日志
        </div>
        <a-icon type="close" class="close" @click="closeTerm"/>
      </div>
      <div ref="xterm"></div>
    </div>

    <div class="content" @click="closeTerm"></div>
  </div>
</template>
<script>
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import io from 'socket.io-client';

export default {
  data() {
    return {
      xtermVisible: true,
      term: null,
      socket: null,
    };
  },
  mounted() {
    this.initSocket();
    this.initXterm();
    this.$nextTick(() => {
      this.xtermVisible = false;
    });
  },
  methods: {
    initSocket() {
      this.socket = io.connect('http://localhost:3001');

      this.socket.on('task-info', data => {
        this.writeTerm(data);
      });
      this.socket.on('task-finish', data => {
        this.writeTerm(data);
        this.startTermNewPart();
      });
    },

    initXterm() {
      this.term = new Terminal({ cols: 100, rows: 10 });
      this.term.open(this.$refs.xterm);
      this.term._initialized = true;
      this.startTermNewPart();
    },

    startTermNewPart() {
      this.writeTerm('---- user $');
    },

    writeTerm(rawStr) {
      const strs = rawStr.split(/\n\r|\n/);
      strs.forEach(str => {
        this.term.writeln(str);
      });
    },
    closeTerm() {
      this.xtermVisible = !this.xtermVisible;
    },
  },
};
</script>
<style lang="less" scoped>
.footer {
  position: fixed;
  bottom: 40px;
  width: calc(~"100% - 280px");
  z-index: 3;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  .hide-term {
    display: none;
  }
  .show-term {
    display: block;
  }
  .title {
    margin-left: 12px;
  }
  .close {
    float: right;
    margin-top: -20px;
    margin-right: 12px;
  }
  .content {
    border-bottom-right-radius: 5px;
    height: 26px;
    background: #1d2935;
    color: #fff;
  }
}
</style>