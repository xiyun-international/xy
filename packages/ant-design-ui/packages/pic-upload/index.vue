<template>
  <div class="pic-upload">
    <div class="upload-wrap">
      <div class="upload-desc">
        <slot></slot>
      </div>
      <div class="upload">
        <a-upload
          :action="url"
          multiple
          :before-upload="handleBeforeUpload"
          :disabled="forceDisable ? true : fileList.length >= max"
          :show-upload-list="false"
          accept="image/*"
          class="a-upload-position"
          :headers="{ Authorization: token }"
          @change="handleUploadChange"
        >
          <div
            v-if="fileList.length < max"
            :class="['upload-button', { disabled: forceDisable }]"
          >
            <i class="icon-plus"></i>
            <span class="btn-txt">点击上传</span>
          </div>
        </a-upload>

        <div v-if="showReference" class="reference">
          <a :href="referencePic" target="_blank">
            <img width="92" height="92" :src="referencePic" alt="" />
          </a>
          <span>参考模板</span>
        </div>

        <template v-for="(file, index) in fileList">
          <div
            v-if="file.status === 'uploading'"
            :key="index"
            class="uploading"
          >
            <span>文件上传中</span>
            <div class="progress">
              <div class="bar" :style="{ width: `${file.percent}%` }"></div>
            </div>
          </div>

          <div
            v-else-if="file.status === 'error'"
            :key="index"
            class="file-list"
          >
            <div class="error-tip">图片上传失败</div>
            <div class="file-option">
              <span @click="handleRemoveFile(index)">删除</span>
            </div>
          </div>

          <div v-else class="file-list" :key="index">
            <img
              width="92"
              height="92"
              :src="file.small_src || file.response.data.small_src"
              alt=""
            />
            <div class="file-option">
              <span @click="handleRemoveFile(index)">删除</span>
              <a
                :href="file.middle_src || file.response.data.middle_src"
                target="_blank"
                >预览</a
              >
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pic-upload',
  props: {
    value: [Array, Object, undefined, String],
    url: {
      type: String,
      // 默认附件地址是ali的，如果非ali的，则可以用props增加url参数，给出上传地址
      default: '',
    },
    fileData: {
      type: Array,
      default() {
        return [];
      },
    },
    max: {
      type: Number,
      default: 1,
    },
    showReference: Boolean,
    referencePic: {
      type: String,
      default: '',
    },
    forceDisable: Boolean,
    token: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // 批量上传时是否已提示过错误消息
      isShowedError: true,
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  },
  watch: {
    fileData(val) {
      val.forEach(item => {
        this.fileList.push({
          ...item,
          uid: item.image_id,
          status: 'done',
        });
      });
    },
    value(val) {
      if (_.isEmpty(val)) {
        this.fileList = [];
      }
    },
  },
  mounted() {
    if (this.fileData.length > 0) {
      this.fileData.forEach(item => {
        this.fileList.push({
          ...item,
          uid: item.image_id,
          status: 'done',
        });
      });
    }
  },
  methods: {
    /**
     * 上传流程第一步：校验文件合法性，添加合法文件到文件列表中
     *
     * @param file
     * @param list
     */
    handleBeforeUpload(file, list) {
      const { fileList, max } = this;
      if (fileList.length > max) {
        this.$message.error(`已达到最大上传数量${max}张`);
        return false;
      }
      if (fileList.length + list.length > max) {
        if (this.isShowedError) {
          this.$message.error(`总数已超过${max}张，请重新选择`);
          this.isShowedError = false;
          _.delay(this.resetsShowedError, 1500);
        }
        return false;
      }

      // 上传前先添加文件至列表中
      this.fileList.push({
        uid: file.uid,
        status: 'uploading',
        percent: 0,
      });
    },
    /**
     * 上传流程第二步：上传中，错误/完成，都会调用此方法
     *
     * @param file
     * @param fileList
     * file 对象中有用的属性：
     * percent（上传进度）, status（上传的状态：uploading，error，done), uid（唯一id）
     */
    handleUploadChange({ file }) {
      if (file.status === 'uploading') {
        const idx = _.findIndex(this.fileList, o => o.uid === file.uid);
        this.fileList[idx].percent = file.percent;
      }
      if (file.status === 'done') {
        this.onUploadDone(file);
      }
    },

    onUploadDone(file) {
      const idx = _.findIndex(this.fileList, o => o.uid === file.uid);
      if (file.response.code !== 100000 && file.response.code !== 10000) {
        this.fileList[idx].status = 'error';
      } else {
        const data = file.response.data || file.response.resultObject;
        this.fileList[idx] = {
          ...this.fileList[idx],
          name: file.name,
          image_id: data.image_id,
          middle_src: data.middle_src || data.url,
          path: data.path,
          small_src: data.small_src || data.url,
          status: 'done',
        };
        this.$emit('change', this.fileList);
      }
    },

    // 重置
    resetsShowedError() {
      this.isShowedError = true;
    },

    handleRemoveFile(index) {
      const removeList = _.cloneDeep(this.fileList);
      _.remove(removeList, (file, idx) => {
        return idx === index;
      });
      this.fileList = removeList;
      this.$emit('change', this.fileList);
    },

    handleCancel() {
      this.previewVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.pic-upload {
  :global(.ant-form-item-required) {
    font-size: 12px;
    color: #333;
  }
  .upload-desc {
    font-size: 12px;
    margin-top: 8.5px;
    margin-bottom: 30px;
    color: #ccc;
    div {
      margin: 0;
      line-height: 23px;
    }
  }
  .upload-button {
    font-size: 12px;
    color: #333;
    width: 94px;
    height: 94px;
    border: 1px dashed #d1d1d1;
    //border-radius: 2px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transition: border-color 0.3s ease;
    animation: hover 0.3s linear;
    &:hover {
      border-color: #1890ff;
    }
    .icon-plus {
      color: inherit;
      display: block;
    }
    .icon-plus::before {
      display: block;
      content: '';
      width: 35px;
      height: 2px;
      background: #999;
      transform: translateY(17.5px);
    }
    .icon-plus::after {
      display: block;
      content: '';
      width: 2px;
      height: 35px;
      background: #999;
      transform: translateX(16.5px);
    }
    .btn-txt {
      color: #999;
      margin-top: 10px;
    }
  }
  .upload-button.disabled {
    cursor: not-allowed;
  }
  .file-list {
    width: 94px;
    height: 94px;
    border: 1px solid #d1d1d1;
    margin-right: 20px;
    margin-bottom: 20px;
    position: relative;

    .file-option {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(50, 50, 50, 0.7);
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span,
      a {
        color: white;
        background: grey;
        text-align: center;
        width: 60px;
        height: 30px;
        line-height: 30px;
        margin: 5px;
        font-size: 12px;
        transition: background-color 0.3s ease;
        cursor: pointer;
        border-radius: 3px;
        &:hover {
          background-color: darkgrey;
        }
      }
    }
    &:hover .file-option {
      display: flex;
    }
  }
  .file-list:last-child {
    margin-right: unset;
  }
  .error-tip {
    line-height: 94px;
    text-align: center;
    color: #f70;
  }
  .before-upload {
    width: 94px;
    height: 94px;
    background: rgba(90, 90, 90, 0.2);
    cursor: not-allowed;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
  }
  .upload-wrap {
    .upload {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      .a-upload-position {
        position: relative;
        margin-right: 20px;
        margin-bottom: 20px;
      }
      .reference {
        font-size: 12px;
        box-sizing: border-box;
        width: 94px;
        height: 94px;
        border: 1px solid #d1d1d1;
        //border-radius: 2px;
        position: relative;
        margin-right: 20px;
        cursor: pointer;
        span {
          position: absolute;
          width: 100%;
          height: 30px;
          background: #f5f5f5;
          color: #999;
          left: 0;
          bottom: 0;
          line-height: 30px;
          text-align: center;
        }
      }
      .uploading {
        font-size: 12px;
        width: 94px;
        height: 94px;
        border: 1px solid #d1d1d1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: 20px;
      }
    }
  }
  .progress {
    width: 62px;
    height: 3px;
    background: rgba(120, 120, 120, 0.2);
    .bar {
      width: 0;
      height: 100%;
      //background: #1890ff;
      background: #52c41a;
    }
  }
}
</style>
