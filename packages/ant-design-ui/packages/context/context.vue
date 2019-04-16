<template>
  <div class="contextGrid">
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item :key="-1">
          <a href="#/">渠道商中心</a>
        </a-breadcrumb-item>
        <a-breadcrumb-item v-for="item in breadcrumb" :key="item.name">
          <router-link :to="item.path" v-if="item.path">
            {{ item.name }}
          </router-link>
          <span v-else>{{ item.name }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="titleGrid">
      <div class="title">
        <div />
        {{ titleName }}
      </div>
      <div style="margin: 4px auto auto 8px">
        <span v-if="tag">
          <a-tag :color="LabelColorMap[tagStatus]">{{ tag }}</a-tag>
        </span>
      </div>
      <div>
        <slot name="right"> </slot>
      </div>
    </div>
    <div>
      <slot />
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
  .contextGrid {
    .breadcrumb {
      font-size: 12px;
      display: flex;
      width: 100%;
      margin-top: 6px;
      padding-bottom: 22px;
      border-bottom: 1px solid #e6e6e6;
    }
    .titleGrid {
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
