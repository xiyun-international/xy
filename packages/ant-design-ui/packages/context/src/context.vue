<template>
  <div class="xy-context" ref="context">
    <div class="context-header">
      <template v-if="isHasBreadcrumb">
        <a-breadcrumb class="breadcrumb">
          <a-breadcrumb-item v-for="item in breadcrumb" :key="item.name">
            <span v-if="item.href" @click="onHref(item)">
              {{ item.name }}
            </span>
            <span v-else-if="item.handler" @click="onHandler(item)">
              {{ item.name }}
            </span>
            <router-link v-else-if="item.path" :to="item.path">
              {{ item.name }}
            </router-link>
            <span v-else>{{ item.name }}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </template>
      <div class="context-title">
        <div>
          <span class="title">
            {{ titleName }}
          </span>
          <a-tag v-if="tag" :color="LabelColorMap[tagStatus]">{{ tag }}</a-tag>
        </div>
        <div>
          <slot name="right"></slot>
        </div>
      </div>
    </div>
    <template v-if="isRenderItem === false">
      <div class="context-body">
        <div class="context-flex"><slot></slot></div>
      </div>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script>
import last from 'lodash/last';

export default {
  name: 'XyContext',
  props: {
    breadcrumb: {
      type: Array,
      default() {
        return [];
      },
    },
    tag: {
      type: String,
      default: '',
    },
    tagStatus: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    // blue - 008EF0 green-13CE66 red-FA4B4B yellow-F8BA2A
    return {
      isRenderItem: false,
      titleName: '',
      LabelColorMap: [
        '',
        '#F8BA2A',
        '#F8BA2A',
        '#008EF0',
        '#FA4B4B',
        '#13CE66',
      ],
      monitor: null,
    };
  },
  created() {
    this.handleTitle();
    this.handleContextItem();
  },
  mounted() {
    if (this.isIframe) {
      this.postMessage();
      this.mutationObserver();
    }
  },
  computed: {
    isHasBreadcrumb() {
      return this.breadcrumb.length > 0;
    },
    isIframe() {
      return window.self !== window.parent;
    }
  },
  beforeDestroy() {
    if (this.monitor) {
      this.monitor.disconnect();
    }
  },
  methods: {
    /**
     * 处理 Title
     */
    handleTitle() {
      let titleName = this.title;
      if (titleName.length === 0) {
        const { name } = last(this.breadcrumb);
        titleName = name;
      }
      this.titleName = titleName;
    },

    /**
     * 处理 context-item
     */
    handleContextItem() {
      const isRenderItem = this.$slots.default.some(item => {
        if (item.componentOptions) {
          return item.componentOptions.tag.indexOf('xy-context-item') !== -1;
        }
      });

      this.isRenderItem = isRenderItem;
    },

    /**
     * 针对 iFrame 情况，点击面包屑直接 location.href 地址
     */
    onHref(item) {
      if (item.href && this.$xy) {
        window.location.href = this.$xy.components.context.href + item.href;
      }
    },

    /**
     * 点击面包屑自定义事件
     */
    onHandler(item) {
      if (item.handler && typeof item.handler === 'function') {
        item.handler();
      }
    },

    /**
     * 监听页面数据是否变动
     */
    mutationObserver() {
      this.monitor = new MutationObserver(mutationsList => {
        if (mutationsList.length > 0) {
          this.postMessage();
        }
      });

      this.monitor.observe(this.$refs.context, {
        childList: true,
        subtree: true,
      });
    },

    /**
     * 发送 postMessage 消息
     */
    postMessage() {
      const div = this.$refs.context;
      console.log(div.clientHeight);
      const height = div ? div.clientHeight : 400;
      window.parent.postMessage({
        isLoading: false,
        height: height,
      }, '*');
    }

  },
};
</script>

<style lang="less" scoped>
.xy-context {
  background: inherit;
  /*height: inherit;*/
  overflow: hidden;

  .context-header {
    padding: 20px 24px;
    background: #fff;

    .breadcrumb {
      margin-bottom: 20px;
    }

    .context-title {
      display: flex;
      justify-content: space-between;

      .title {
        font-size: 20px;
        font-weight: normal;
        line-height: 32px;
        vertical-align: middle;
        margin-right: 8px;
      }
    }
  }

  .context-body {
    min-height: 74vh;
    margin: 24px 24px 0 24px;
    background: #fff;
    padding: 28px 32px 28px 32px;
  }
}
</style>
