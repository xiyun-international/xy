<template>
  <div>
    <table style="width: 100%">
      <thead v-if="data.head" class="ant-table-thead">
        <tr>
          <th
            v-for="(thead,tIndex) in data.head"
            :key="tIndex"
            :colspan="thead.options.colspan"
          >{{ thead.title }}</th>
        </tr>
      </thead>
      <tbody class="ant-table-tbody">
        <tr
          class="ant-table-row ant-table-row-level-0"
          v-for="(tr,index) in data.body"
          :key="index"
        >
          <td
            v-for="(td,tdIndex) in tr"
            :key="tdIndex"
            :colspan="td.options?td.options.colspan:''"
            :style="td.options?td.options.style:{}"
          >
            <template v-if="td.type==='text'">{{ td.value }}</template>
            <template v-if="td.components==='v-viewer'||td.components==='download'">
              <template v-for="(img,imgIndex) in td.value">
                <div v-viewer :key="imgIndex">
                  <img v-if="img.type==='picWall'" :src="img.src" />
                  <a v-if="img.type==='download'" :href="img.src">{{ img.name }}</a>
                  <div>{{ img.desc }}</div>
                </div>
              </template>
            </template>
            <template v-if="td.type==='components'">
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
import VueViewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import { XySensText } from '../sens-text';

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
    VueViewer,
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
</style>


