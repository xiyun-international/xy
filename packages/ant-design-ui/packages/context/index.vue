<template>
  <div class="xy-context">
    <div class="context-header">
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(item, index) in breadcrumb" :key="item.name">
          <a
            href="#/"
            v-if="index === 0 && (item.path === undefined || item.path === '')"
          >{{ item.name }}</a>
          <router-link :to="item.path" v-else-if="item.path">
            {{ item.name }}
          </router-link>
          <span v-else>{{ item.name }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
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
    <div class="context-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { last } from 'lodash';

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
    return {
      titleName: '',
      LabelColorMap: ['', '', '#FFCC66', '#FFCC66', '', '#DC143C'],
    };
  },
  mounted() {
    let titleName = this.title;
    if (titleName.length === 0) {
      const { name } = last(this.breadcrumb);
      titleName = name;
    }
    this.titleName = titleName;
  },
};
</script>

<style lang="less" scoped>
  .xy-context {
    .context-header {
      padding: 20px 24px;
      background: #fff;
    }
    .context-title {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 20px;
        font-weight: bold;
        line-height: 32px;
        vertical-align: middle;
        margin-right: 8px;
      }
    }
    .context-body {
      margin: 24px;
      background: #fff;
    }
  }
</style>
