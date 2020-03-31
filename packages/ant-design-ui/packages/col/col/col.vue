<script>
export default {
  name: 'xy-col',
  provide() {
    return {
      table: this,
    };
  },
  props: {
    span: {
      type: Number,
      default() {
        return 2;
      },
    },
    labelWidth: {
      type: String,
      default() {
        return '140px';
      },
    },
  },
  methods: {
    // 定义数组和下

    // 定义数组
    definedTemplate(template, index) {
      if (!template[index]) {
        template[index] = [];
      }
    },
    getCellData() {
      const slots = this.$slots.default;

      let index = 0; // 表格行数索引
      let columnIndex = 0; // 表格列数索引
      const template = [];
      for (let i = 0; i < slots.length; i++) {
        const itemNode = slots[i];
        if (!itemNode.componentOptions) continue;

        this.definedTemplate(template, index);

        // 设置单行属性
        if (itemNode.componentOptions.propsData.row !== undefined) {
          // 如果TD模式，判断需要换行了，这就不用强制换行
          if (template[index].length !== 0) {
            // 数组下标加 1，列为 0
            index++;
          }
          columnIndex = 0; // 列值也马上变化
          this.definedTemplate(template, index);
          template[index][columnIndex] = itemNode;
        } else {
          // 如果上一个是单行模式，数组下标加 1
          if (slots[i - 1]) {
            const preNode = slots[i - 1];
            if (preNode.componentOptions && preNode.componentOptions.propsData.row !== undefined) {
              index++;
              columnIndex = 0;
              this.definedTemplate(template, index);
            }
          }

          template[index][columnIndex] = itemNode;

          // 列数不要超过最大值，否则数组下标加 1
          if (columnIndex >= this.span - 1) {
            index++;
            columnIndex = 0;
          } else {
            // 只有一列的时候，每次循环加 1
            columnIndex++;
          }
        }
      }
      return template;
    },
    renderCell() {
      const template = [];
      const cellData = this.getCellData();

      cellData.forEach(tr => {
        const trLen = tr.length === 1 ? this.span * 2 : 1;
        template.push(
          <tr>
            {tr.map(vNode => {
              const td = [vNode.componentOptions.propsData.label, vNode.componentOptions.children];
              return td.map((node, index) => {
                let label = '';
                let colspan = 1;
                // Label 属性
                if (index === 0) {
                  label = `width: ${this.labelWidth}`;
                } else if (trLen > 1) {
                  colspan = trLen;
                }

                return (
                  <td colspan={colspan} class={index === 0 ? 'label' : ''} style={label}>
                    <div class="xy-table-cell">{node}</div>
                  </td>
                );
              });
            })}
          </tr>
        );
      });
      return template;
    },
  },
  render() {
    return (
      <table class="xy-table">
        <tbody>{this.renderCell()}</tbody>
      </table>
    );
  },
};
</script>

<style lang="less" scoped>
.xy-table {
  width: 100%;
  border: 1px solid #e8e8e8;
  border-right: 0;
  border-bottom: 0;
  text-align: left;
  border-radius: 4px 4px 0 0;
  border-collapse: collapse;
  tr {
    td.label {
      background-color: #fafafa;
    }
    td {
      border-bottom: 1px solid #e8e8e8;
      padding: 16px 16px;
      border-right: 1px solid #e8e8e8;
    }
  }
}
</style>
