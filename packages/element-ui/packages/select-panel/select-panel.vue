<template>
  <div
    class="el-select"
    :class="[selectSize ? 'el-select--' + selectSize : '']"
    @click.stop="toggleMenu"
    v-clickoutside="handleClose">
    <el-input
      ref="reference"
      v-model="selectedLabel"
      type="text"
      :placeholder="currentPlaceholder"
      :name="name"
      :id="id"
      :autocomplete="autocomplete"
      :size="selectSize"
      :disabled="selectDisabled"
      :readonly="readonly"
      :validate-event="false"
      :class="{ 'is-focus': visible }"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup.native="debouncedOnInputChange"
      @keydown.native.esc.stop.prevent="visible = false"
      @keydown.native.tab="visible = false"
      @paste.native="debouncedOnInputChange"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false">
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template slot="suffix">
        <i
          v-show="!showClose"
          :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"
        ></i>
        <i
          v-if="showClose"
          class="el-select__caret el-input__icon el-icon-circle-close"
          @click="handleClearClick"
        ></i>
      </template>
    </el-input>
    <transition
      name="el-zoom-in-top"
      @after-leave="doDestroy"
    >
      <el-select-menu
        ref="popper"
        :append-to-body="popperAppendToBody"
        v-show="visible && emptyText !== false">
        <slot>
          <p
            class="el-select-dropdown__empty">
            {{ emptyText }}
          </p>
        </slot>
      </el-select-menu>
    </transition>
  </div>
</template>

<script type="text/babel">
<<<<<<< HEAD
// eslint-disable
=======
>>>>>>> fix: 去掉eslint-disable
import Emitter from 'element-ui/src/mixins/emitter';
import Focus from 'element-ui/src/mixins/focus';
import Locale from 'element-ui/src/mixins/locale';
import ElInput from 'element-ui/packages/input';
import Clickoutside from 'element-ui/src/utils/clickoutside';
import { addResizeListener } from 'element-ui/src/utils/resize-event';
import { t } from 'element-ui/src/locale';
import { valueEquals } from 'element-ui/src/utils/util';
import ElSelectMenu from './select-dropdown.vue';

export default {
  mixins: [Emitter, Locale, Focus('reference')],

  name: 'XySelectPanel',

  componentName: 'XySelectPanel',

  inject: {
    elForm: {
      default: '',
    },

    elFormItem: {
      default: '',
    },
  },

  provide() {
    return {
      select: this,
    };
  },

  computed: {
    tmpElFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },

    readonly() {
      // return !isIE() && !isEdge() && !this.visible;
      return true;
    },

    showClose() {
      const hasValue = this.value !== undefined && this.value !== null && this.value !== '';
      return this.clearable
        && !this.selectDisabled
        && this.inputHovering
        && hasValue;
    },

    iconClass() {
      return this.visible ? 'arrow-up is-reverse' : 'arrow-up';
    },

    emptyText() {
      return this.t('el.select.noData');
    },

    selectSize() {
      return this.size || this.tmpElFormItemSize || (this.$ELEMENT || {}).size;
    },

    selectDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
  },

  components: {
    ElInput,
    ElSelectMenu,
  },

  directives: { Clickoutside },

  props: {
    name: String,
    id: String,
    value: {
      required: true,
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    automaticDropdown: Boolean,
    size: String,
    disabled: Boolean,
    clearable: Boolean,
    loading: Boolean,
    popperClass: String,
    loadingText: String,
    placeholder: {
      type: String,
      default() {
        return t('el.select.placeholder');
      },
    },
    popperAppendToBody: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      inputWidth: 0,
      initialInputHeight: 0,
      cachedPlaceHolder: '',
      visible: false,
      softFocus: false,
      selectedLabel: '',
      inputHovering: false,
      currentPlaceholder: '',
      menuVisibleOnFocus: false,
      isSilentBlur: false,
    };
  },

  watch: {

    placeholder(val) {
      this.cachedPlaceHolder = val;
      this.currentPlaceholder = val;
    },

    value(val, oldVal) {
      if (!valueEquals(val, oldVal)) {
        this.dispatch('ElFormItem', 'el.form.change', val);
      }
      this.selectedLabel = val;
    },

    visible(val) {
      if (!val) {
        this.broadcast('ElSelectDropdown', 'destroyPopper');
        if (this.$refs.input) {
          this.$refs.input.blur();
        }
        this.menuVisibleOnFocus = false;
        this.$nextTick(() => {
          if (this.$refs.input && this.$refs.input.value === '') {
            this.currentPlaceholder = this.cachedPlaceHolder;
          }
        });
      } else {
        this.broadcast('ElSelectDropdown', 'updatePopper');
      }
      this.$emit('visible-change', val);
    },
  },

  methods: {
    emitChange(val) {
      if (!valueEquals(this.value, val)) {
        this.$emit('change', val);
      }
    },

    handleFocus(event) {
      if (!this.softFocus) {
        if (this.automaticDropdown) {
          this.visible = true;
          this.menuVisibleOnFocus = true;
        }
        this.$emit('focus', event);
      } else {
        this.softFocus = false;
      }
    },

    blur() {
      this.visible = false;
      this.$refs.reference.blur();
    },

    handleBlur(event) {
      setTimeout(() => {
        if (this.isSilentBlur) {
          this.isSilentBlur = false;
        } else {
          this.$emit('blur', event);
        }
      }, 50);
      this.softFocus = false;
    },

    handleClearClick(event) {
      this.deleteSelected(event);
    },

    doDestroy() {
      if (this.$refs.popper) this.$refs.popper.doDestroy();
    },

    handleClose() {
      this.visible = false;
    },

    toggleMenu() {
      if (!this.selectDisabled) {
        if (this.menuVisibleOnFocus) {
          this.menuVisibleOnFocus = false;
        } else {
          this.visible = !this.visible;
        }
        if (this.visible) {
          (this.$refs.input || this.$refs.reference).focus();
        }
      }
    },

    deleteSelected(event) {
      event.stopPropagation();
      const value = '';
      this.$emit('input', value);
      this.emitChange(value);
      this.visible = false;
      this.$emit('clear');
    },

    resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
    },

    handleResize() {
      this.resetInputWidth();
    },
  },

  created() {
    this.cachedPlaceHolder = this.placeholder;
    this.currentPlaceholder = this.placeholder;
    this.$emit('input', '');
  },

  mounted() {
    addResizeListener(this.$el, this.handleResize);

    const { reference } = this.$refs;
    if (reference && reference.$el) {
      const sizeMap = {
        medium: 36,
        small: 32,
        mini: 28,
      };
      this.initialInputHeight = reference.$el.getBoundingClientRect().height
        || sizeMap[this.selectSize];
    }
    this.$nextTick(() => {
      if (reference && reference.$el) {
        this.inputWidth = reference.$el.getBoundingClientRect().width;
      }
    });
  },
};
</script>
