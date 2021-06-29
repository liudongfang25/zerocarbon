<template>
  <div class="upload-file">
    <!-- 文件列表 -->
    <transition-group
      class="upload-file-list el-upload-list el-upload-list--text"
      name="el-fade-in-linear"
      tag="ul"
    >
      <li
        :key="index"
        class="el-upload-list__item ele-upload-list__item-content"
        v-for="(file, index) in list"
      >
        <img
          src="@/assets/beautiful/pc/upload.png"
          width="50"
          alt="dark"
          :title="file"
        />
        <img
          src="@/assets/beautiful/pc/wrong.png"
          width="16"
          class="delete-icon"
          alt="dark"
          @click="() => remove({ file, index })"
        />
      </li>
    </transition-group>

    <input
      style="display: none"
      @change="addFile"
      :multiple="multiple"
      type="file"
      id="file"
    />
    <!-- 删除确认弹框 -->
    <el-dialog
      :visible.sync="open"
      width="3.7rem"
      custom-class="secondary-cartridge-modal delete-file-modal"
      :show-close="false"
      center
    >
      <div class="text-center">是否删除该附件？</div>

      <div class="dialog-footer">
        <el-row justify="space-between">
          <el-col :span="12" class="border-right">
            <div class="w100" @click="cancelModal">取消</div>
          </el-col>
          <el-col :span="12">
            <div class="w100 primary-btn" @click="deleteFile">确认删除</div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deleteUpload, uploadFile } from "@/api/beautiful";

export default {
  name: "my-upload",
  props: {
    fileSize: Number,
    fileType: Array,
    name: String,
    fileList: {
      type: Array,
      default: [],
    },
    data: Object,
    multiple: Boolean,
    limit: Number,
    // changeFile: Function,
    // onBefore: Function,
    // onProgress: Function,
    // onSuccess: Function,
    // onFailed: Function,
    // onFinished: Function,
  },
  data() {
    return {
      open: false,
      deleteUrl: null,
      deleteIndex: null,
    };
  },
  computed: {
    list() {
      return this.fileList;
    },
  },
  methods: {
    btnChange() {
      var file = document.getElementById("file");
      file.click();
    },
    addFile({ target: { files } }) {
      if (!files.length) return;
      //input标签触发onchange事件时，将文件加入待上传列表
      var fd = new window.FormData();

      for (let i = 0, l = files.length; i < l; i++) {
        if (!this.beforeUpload(files[i])) return;
        fd.append("file", files[i]);
      }
      uploadFile(fd).then((res) => {
        if (res.isSuccess && res.data) {
          const fileList = this.fileList.concat([res.data]);
          console.log(fileList);
          this.$emit("changeFile", fileList);
        }
      });
    },
    beforeUpload(f) {
      const maxSzie = this.fileSize;
      if (f.size / 1024 / 1024 > maxSzie) {
        this.$message.error("上传文件大小不能超过" + maxSzie + "M.");
        return false;
      }
      var types = this.fileType;
      const filtType = this.getFileType(f.name);
      for (let i = 0; i < types.length; i++) {
        if (types[i] === filtType) return true;
      }
      this.$message.error("上传文件格式不允许!");
      return false;
    },
    getFileType(filePath) {
      var startIndex = filePath.lastIndexOf(".");
      if (startIndex != -1)
        return filePath
          .substring(startIndex + 1, filePath.length)
          .toLowerCase();
      else return "";
    },
    remove({ file, index }) {
      this.open = true;
      this.deleteUrl = file;
      this.deleteIndex = index;
    },
    cancelModal() {
      this.open = false;
    },
    deleteFile() {
      deleteUpload({ filePath: this.deleteUrl })
        .then((res) => {
          if (res.isSuccess && res.data && this.deleteIndex !== null) {
            const fileList = [...this.fileList];
            fileList.splice(this.deleteIndex, 1);
            this.$emit("changeFile", fileList);
            this.deleteUrl = null;
            this.open = false;
            this.deleteIndex = null;
          }
        })
        .catch(() => {});
    },
  },
  created() {
    // this.fileList = this.list;
  },
};
</script>

<style scoped lang="scss">
.upload-file-uploader {
  margin-bottom: 0.05rem;
}
.upload-file-list .el-upload-list__item {
  line-height: 2;
  margin-right: 0.1rem;
  position: relative;
  display: inline-block;
  width: auto;
}
.upload-file-list .ele-upload-list__item-content .delete-icon {
  position: absolute;
  top: -8px;
  right: -8px;
  cursor: pointer;
}
</style>
