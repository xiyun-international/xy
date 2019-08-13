<template>
  <a-spin tip="加载中" :spinning="loading">
    <a-modal
      title="关联城市"
      v-model="visible"
      @ok="handleSubmit"
      okText="确认"
      cancelText="取消"
      width="50%"
      :bodyStyle="{ height: '580px' }"
    >
      <div class="ant-table h556">
        <table>
          <thead class="ant-table-thead">
            <tr>
              <th>省</th>
              <th>市</th>
            </tr>
          </thead>
          <tbody class="ant-table-tbody">
            <tr
              class="ant-table-row ant-table-row-level-0"
              v-for="(item, indexFirst) in dataList"
              :key="item.value"
            >
              <td width="105" class="light-gray">
                <a-checkbox
                  :key="item.value"
                  :indeterminate="item.indeterminate"
                  :checked="item.checked"
                  @change="e => handleCheck(0, item, e, indexFirst)"
                >{{ item.label }}</a-checkbox>
              </td>
              <td>
                <span v-for="(children, indexSecond) in item.children" :key="children.value">
                  <a-checkbox
                    :key="children.value"
                    :checked="children.checked"
                    @change="e => handleCheck(1, children, e, indexFirst, indexSecond)"
                  >{{ children.label }}</a-checkbox>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </a-modal>
  </a-spin>
</template>

<script>
export default {
  name: 'XySelectCity',
  props: {
    initCity: {
      type: Array,
      default() {
        return [];
      },
    },
    url: {
      // 获取城市列表数据接口地址
      type: String,
      default: '',
    },
  },
  data() {
    return {
      visible: true,
      dataList: [],
      selectedList: [],
      h580: { height: '600px' },
      loading: false,
    };
  },
  watch: {
    initCity: {
      deep: true,
      handler(val) {
        for (let i = 0; i < this.dataList.length; i += 1) {
          for (let k = 0; k < this.dataList[i].children.length; k += 1) {
            if (val.includes(String(this.dataList[i].value))) {
              this.$set(this.dataList[i].children[k], 'checked', true);
            }
          }
        }
      },
    },
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      this.$post(this.url).then(res => {
        this.dataList = res.resultObject || res.data.resultObject;
        for (let i = 0; i < this.dataList.length; i += 1) {
          this.dataList[i].count = 0;
          for (let k = 0; k < this.dataList[i].children.length; k += 1) {
            if (
              this.initCity.includes(String(this.dataList[i].children[k].value))
            ) {
              this.$set(this.dataList[i].children[k], 'checked', true);
              this.selectedList.push(this.dataList[i].children[k].value);
              this.dataList[i].count += 1;
            }
            if (k === this.dataList[i].children.length - 1) {
              if (
                this.dataList[i].count > 0 &&
                this.dataList[i].count !== this.dataList[i].children.length
              ) {
                this.dataList[i].indeterminate = true;
              } else if (
                this.dataList[i].count === this.dataList[i].children.length
              ) {
                this.$set(this.dataList[i], 'checked', true);
              }
            }
          }
        }
        this.$nextTick(() => {
          this.loading = false;
        });
      });
    },
    handleSubmit() {
      this.$emit('submitSelected', this.selectedList);
    },
    handleCheck(flag, item, e, indexFirst, indexSecond) {
      const { children } = this.dataList[indexFirst];
      switch (flag) {
        case 0:
          this.$set(this.dataList[indexFirst], 'checked', e.target.checked);
          for (let i = 0; i < children.length; i += 1) {
            children[i].checked = e.target.checked;
            if (e.target.checked) {
              this.selectedList.push(children[i].value);
            } else {
              this.selectedList.splice(
                this.selectedList.findIndex(
                  itemFirst => itemFirst.value === children[i].value,
                ),
                1,
              );
            }
          }
          this.dataList[indexFirst].indeterminate = false;
          break;
        case 1:
          if (children.length > 0) {
            this.$set(
              this.dataList[indexFirst].children[indexSecond],
              'checked',
              e.target.checked,
            );
            if (e.target.checked) {
              this.selectedList.push(children[indexSecond].value);
            } else {
              this.selectedList.splice(
                this.selectedList.findIndex(
                  itemSecond =>
                    itemSecond.value === children[indexSecond].value,
                ),
                1,
              );
            }
            if (
              this.selectedList.length > 0 &&
              this.selectedList.length !== children.length
            ) {
              this.dataList[indexFirst].indeterminate = true;
              this.$set(this.dataList[indexFirst], 'checked', false);
            } else {
              this.$set(this.dataList[indexFirst], 'checked', true);
              this.dataList[indexFirst].indeterminate = false;
            }
          }
          break;
        default:
      }
    },
  },
};
</script>

<style lang="less" scoped>
.light-gray {
  background: #fafafa;
}
.h556 {
  height: 556px;
  overflow-y: auto;
}
</style>
