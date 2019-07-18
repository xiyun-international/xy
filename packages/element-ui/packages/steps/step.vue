<template>
  <div class="xy-steps-item" :class="[stepClass, customIconClass]">
    <div class="xy-step-item-icon">
      <span class="xy-steps-icon">
        <slot name="icon">
          <template v-if="isFinished">
            <i class="el-icon-check"></i>
          </template>
          <template v-else>
            {{ setpNumber }}
          </template>
        </slot>
      </span>
    </div>
    <div class="xy-step-item-content">
      <div class="xy-steps-item-title">{{ showTitle }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "XyStep",
    props: {
      title: String,
      status: String,
    },
    data() {
      return {
        index: -1,
        current: -1,
        max: -1,
        currentStatus: '',
      }
    },
    computed: {
      stepClass() {
        if (this.index < this.current) {
          this.currentStatus = 'finish';
          return 'xy-steps-item-finish';
        } else if (this.index === this.current) {
          this.currentStatus = 'process';
          return 'xy-steps-item-process';
        } else {
          this.currentStatus = '';
          return '';
        }
      },
      setpNumber() {
        return this.index + 1;
      },
      isFinished() {
        return this.currentStatus === 'finish';
      },
      showTitle() {
        return this.title || `步骤${this.index + 1}`;
      },
      customIconClass() {
        return this.$slots.icon ? 'xy-steps-item-custom' : '';
      }
    },
    beforeCreate() {
      this.$parent.steps.push(this);
    },
    beforeDestroy() {
      const steps = this.$parent.steps;
      const index = steps.indexOf(this);
      if (index >= 0) {
        steps.splice(index, 1);
      }
    },
    mounted() {
      const unwatch = this.$watch('index', () => {
        this.$watch('$parent.current', current => {
          this.current = current;
          this.max = this.$parent.steps.length;
        }, { immediate: true });
        unwatch();
      });
    }
  }
</script>

<style scoped lang="less">
  .xy-steps-item {
    display: inline-block;
    flex: 1;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;

    .xy-step-item-icon {
      display: inline-block;
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border: 1px solid rgba(0, 0, 0, 0.25);
      border-radius: 24px;
    }
    .xy-step-item-content {
      display: inline-block;
      line-height: 24px;
      vertical-align: top;
    }
    &:last-child {
      flex: none;
    }
    &:not(:last-child) {
      margin-right: 12px;
      .xy-steps-item-title {
        position: relative;
        padding-right: 12px;

        &:after {
          content: '';
          height: 1px;
          width: 999px;
          background: #e8e8e8;
          position: absolute;
          top: 50%;
          left: 100%;
        }
      }
    }

    &.xy-steps-item-process {
      .xy-step-item-icon {
        background: #1890ff;
        border-color: #1890ff;
        > .xy-steps-icon {
          color: #fff;
        }
      }
      .xy-steps-item-title {
        font-weight: bold;
      }

      &.xy-steps-item-custom {
        .xy-step-item-icon {
          background: unset;
          border: unset;
          > .xy-steps-icon {
            color: #1890ff;
            font-size: 24px;
          }
        }
      }
    }

    &.xy-steps-item-finish {
      .xy-step-item-icon {
        border-color: #1890ff;
        > .xy-steps-icon {
          color: #1890ff;
        }
      }
      &:not(:last-child) {
        .xy-steps-item-title {
          &:after {
            background: #1890ff;
          }
        }
      }
    }
  }
</style>
