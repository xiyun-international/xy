<template>
  <div class="xy-context">
    <div class="context-header">
      <template v-if="isHasBreadcrumb">
        <a-breadcrumb class="breadcrumb">
          <a-breadcrumb-item v-for="item in breadcrumb" :key="item.name">
            <router-link v-if="item.path" :to="item.path">
              {{ item.name }}
            </router-link>
            <span v-else-if="item.href" @click="onClick(item)">
              {{ item.name }}
            </span>
            <span v-else-if="item.handler" @click="onClick(item)">
              {{ item.name }}
            </span>
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
    };
  },
  mounted() {
    this.handleTitle();
    this.handleContextItem();
  },
  computed: {
    isHasBreadcrumb() {
      return this.breadcrumb.length > 0;
    },
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
     *
     * 1. href 如果指定，优先级最大；其次才是 handler；
     */
    onClick(item) {
      if (item.href && this.$xy) {
        window.location.href = this.$xy.components.context.href + item.href;
      } else {
        if (item.handler && typeof item.handler === 'function') {
          item.handler();
        }
      }
    },
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
