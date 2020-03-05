<template>
  <div class="ant-table">
    <table>
      <thead v-if="data.head" class="ant-table-thead">
        <tr>
          <th
            v-for="(thead, tIndex) in data.head"
            :key="tIndex"
            :colspan="thead.options.colspan"
          >
            {{ thead.title }}
          </th>
        </tr>
      </thead>
      <tbody class="ant-table-tbody">
        <tr
          class="ant-table-row ant-table-row-level-0"
          v-for="(tr, index) in data.body"
          :key="index"
        >
          <td
            v-for="(td, tdIndex) in tr"
            :key="tdIndex"
            :colspan="td.options ? td.options.colspan : ''"
            :style="td.options ? td.options.style : {}"
          >
            <span v-if="td.type === 'text'" v-html="td.value"></span>
            <template
              v-if="
                td.components === 'v-viewer' || td.components === 'download'
              "
            >
              <template v-for="(img, imgIndex) in td.value">
                <div :key="imgIndex" class="d-LB img-block">
                  <div>
                  <img :src="img.src || img.small" :data-view="img.url" :data-tittle="img.name" />
                  </div>
                  <a v-if="td.components === 'download'"
                    :href="img.downloadUrl" style="display: block;"
                    :download="img.name"
                    :title="img.name"
                  >
                    <a-icon type="download" />
                    {{ img.name }}
                  </a>
                  <div v-else>{{ img.name }}</div>
                  <div :title="img.desc">{{ img.desc }}</div>
                </div>
              </template>
            </template>
            <template v-if="td.type === 'components'">
              <component
                :is="getComponent(td.components)"
                :text="td.value"
                type="mobile"
              ></component>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import XySensText from '../sens-text';

export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    XySensText,
  },
  methods: {
    getComponent(name) {
      switch (name) {
        case 'sensitive':
          return 'XySensText';
        default:
          return '';
      }
    },
    isTypeArray(value) {
      return value instanceof Array;
    },
    getSrcList(imgList) {
      const arr = [];
      imgList.forEach(element => {
        arr.push(element.src);
      });
      return arr;
    },
  },
};
</script>
<style lang="less" scoped>
.ant-table-thead > tr > th {
  text-align: left;
}
img {
  cursor: pointer;
  margin: 5px;
  display: inline-block;
}

.d-LB {
  display: inline-block;
}
</style>
