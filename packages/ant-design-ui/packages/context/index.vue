<template>
  <div class="xy-context">
    <div class="context-header">
      <template v-if="isHasBreadcrumb">
        <a-breadcrumb class="breadcrumb">
          <a-breadcrumb-item v-for="item in breadcrumb" :key="item.name">
            <router-link v-if="item.path" :to="item.path">{{ item.name }}</router-link>
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
    <div class="context-body">
      <div class="context-flex"><slot></slot></div>
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
    // blue - 008EF0 green-13CE66 red-FA4B4B yellow-F8BA2A
    return {
      titleName: '',
      LabelColorMap: ['', '#F8BA2A', '#F8BA2A', '#008EF0', '#FA4B4B', '#13CE66'],
    };
  },
  computed: {
    isHasBreadcrumb() {
      return this.breadcrumb.length > 0;
    }
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
