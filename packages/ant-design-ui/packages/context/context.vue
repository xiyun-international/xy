<template>
  <div class="xy-antd-context-grid">
    <div class="breadcrumb">
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
    </div>
    <div class="xy-antd-title-grid">
      <div class="title">
        <div></div>
        {{ titleName }}
      </div>
      <div style="margin: 4px auto auto 8px">
        <span v-if="tag">
          <a-tag :color="LabelColorMap[tagStatus]">{{ tag }}</a-tag>
        </span>
      </div>
      <div>
        <slot name="right"></slot>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
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
  .xy-antd-context-grid {
    .breadcrumb {
      font-size: 12px;
      display: flex;
      width: 100%;
      margin-top: 6px;
      padding-bottom: 22px;
      border-bottom: 1px solid #e6e6e6;
    }
    .xy-antd-title-grid {
      margin-top: 30px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 20px;
        font-weight: 500;
        display: flex;
        div {
          width: 5px;
          height: 18px;
          margin-top: 6px;
          background: #108ee9;
          display: block;
          margin-right: 10px;
        }
      }
    }
  }
</style>
