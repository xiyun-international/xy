<template>
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
      <tr class="ant-table-row ant-table-row-level-0" v-for="(tr,index) in data.body" :key="index">
        <td
          v-for="(td,tdIndex) in tr"
          :key="tdIndex"
          :colspan="td.options?td.options.colspan:''"
          :style="td.options?td.options.style:{}"
        >
          <template v-if="td.options&&td.options.extra">
            <component
              :is="getComponent(td.options.extra.components)"
              :text="td.value"
              type="mobile"
            ></component>
          </template>
          <template v-else-if="isTypeArray(td.value)">
              <span v-for="(img,imgIndex) in td.value" :key="imgIndex">
               
                <img v-if="img.type==='picWall'" :src="img.src" />
                <a v-if="img.type==='download'" :href="img.src">
                     {{ img.name }}
                </a>
                <div>
                {{ img.desc }}
                </div>
              </span>
          </template>
          <template v-else>{{ td.value }}</template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { XySensText } from '../sens-text/index.vue';
import { XyTitle } from '../title/index.vue';

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
    XyTitle,
  },
  methods: {
    getComponent(name) {
      return name === 'sensitive' ? 'XySensText' : '';
    },
    isTypeArray(value) {
        return value instanceof Array;
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
}
</style>


