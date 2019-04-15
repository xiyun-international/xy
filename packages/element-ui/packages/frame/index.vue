<template>
  <div>
    <template v-if="debug">
      <div>
        <el-form ref="form" :model="form" label-width="140px">
          <el-form-item >
            <div slot="label">
              页面传送门
              <el-tooltip class="item" effect="light" placement="top">
                <div slot="content">
                  在开发、测试时提供此功能，主要解决：<br>
                  智云膳同时需要提测多条业务分支；测试时需要部署多套环境才能进行，实际上对智云膳业务验收只需要有一套测试稳定环境即可。<br>
                  同时也兼容未来的多 ISV（中学线、智云膳、云创）验收场景。<br>
                </div>
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
            <el-input v-model="url"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <iframe
      v-loading="isLoading"
      id="iframe"
      ref="iframe"
      :src="url"
      height="600"
      frameborder="0"
      scrolling="no"
      marginwidth="0"
      marginheight="0"
      leftmargin="0"
      topmargin="0"
      bgcolor="#000000"
    ></iframe>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "xy-frame",
  props: {
    url: String,
    debug: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timer: null,
      isLoading: true,
    };
  },
  mounted() {
    // 传递给智云膳高度
    this.listenerBodyEvent();
    // 接受改变的 iframe 高度
    this.listenerPostMessageEvent();
  },
  methods: {
    /**
     * 监听滚动屏幕
     */
    listenerBodyEvent() {
      document.body.onscroll = _.debounce(() => {
        const top = document.documentElement.scrollTop;
        window.frames[0].postMessage(
          {
            top
          },
          "*"
        );
      }, 150);
    },
    /**
     * 监听子页面的 message 消息
     */
    listenerPostMessageEvent() {
      // 接收消息
      window.addEventListener(
        "message",
        event => {
          const { data } = event;
          if (data !== "" && data.isLoading === false) {
            this.isLoading = data.isLoading;

            if (!data.height) {
              return false;
            }

            // 兼容老Bug
            if (data.height === 0) {
              return false;
            }

            // 设置高度
            if (this.$refs.iframe.height) {
              this.$refs.iframe.height = data.height;
            }

            // 高度设置完后取页面高度
            setTimeout(() => {
              const node = document.getElementsByClassName("main-container");
              if (node.length === 0) {
                return false;
              }

              const height = node[0].clientHeight;
              if (data.height < height) {
                this.$refs.iframe.height = height;
              }
              return true;
            }, 50);
            return true;
          }
          return false;
        },
        false
      );
    }
  },
  destroyed() {
    this.isLoading = false;
    document.body.onscroll = undefined;
  }
};
</script>

<style>
#iframe {
  width: 100%;
  border: 0;
  overflow: hidden;
  display: block;
}
</style>
