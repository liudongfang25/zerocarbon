<template>
  <div class="beautiful-edit over-flow-content">
    <div>
      <nav-btn isEnterBtn />

      <div class="container">
        <div class="nav-breadcrumb">
          <span class="mr5">当前位置:</span>
          <router-link to="/beautiful">
            <span>首页</span>
          </router-link>
          <span>
            <i class="el-icon-d-arrow-right mr5 ml0" />
            项目申报</span
          >
        </div>
        <div class="edit-form-isSuccess w100 mt20" v-if="isEdit">
          <img
            class="mr20"
            src="@/assets/beautiful/pc/yes.png"
            width="26"
            alt="dark"
          />
          <span>您的申报材料已提交成功。</span>
        </div>
        <div class="content-form">
          <el-form
            ref="editForm"
            :model="editForm"
            :rules="editRules"
            class="login-form"
            label-width="80px"
          >
            <div class="item-title">基础信息（所有字段信息都必须填写）</div>
            <el-row>
              <el-col :span="10" class="border-right">
                <el-form-item prop="title" label="标题">
                  <el-input
                    v-model="editForm.title"
                    type="text"
                    auto-complete="off"
                    placeholder="标题"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item prop="unit" label="所在单位">
                  <el-input
                    v-model="editForm.unit"
                    type="text"
                    auto-complete="off"
                    placeholder="所在单位"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item prop="contactNumber" label="联系电话" class="m0">
                  <el-input
                    v-model="editForm.contactNumber"
                    type="text"
                    auto-complete="off"
                    placeholder="联系电话"
                    maxlength="11"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="省份" prop="jobGroup">
                  <el-select
                    v-model="editForm.province"
                    placeholder="请选择任务组名"
                    clearable
                    size="small"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="(dict, i) in provinceData"
                      :key="i"
                      :label="dict"
                      :value="dict"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item prop="head" label="负责人">
                  <el-input
                    v-model="editForm.head"
                    type="text"
                    auto-complete="off"
                    placeholder="负责人"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="dotted-line"></div>

            <div class="item-title">作者名单</div>
            <el-form-item prop="declareAuthors" class="item-title-form">
              <add-user
                :sourceList="editForm.declareAuthors"
                @changeAuthors="changeAuthors"
              />
            </el-form-item>
            <div class="dotted-line"></div>
            <div class="item-title flex">
              项目组别
              <el-form-item prop="projectType" class="item-title-form">
                <el-checkbox-group v-model="editForm.projectType">
                  <el-checkbox label="零碳科技优秀成果"></el-checkbox>
                  <el-checkbox label="零碳科技创新论文"></el-checkbox>
                  <el-checkbox label="零碳科技创意作品"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <div class="item-title flex">
              项目领域
              <el-form-item prop="projectField" class="item-title-form">
                <el-checkbox-group v-model="editForm.projectField">
                  <el-checkbox label="绿色生产"></el-checkbox>
                  <el-checkbox label="低碳生活"></el-checkbox>
                  <el-checkbox label="零碳教育"></el-checkbox>
                  <el-checkbox label="区域环境治理改善"></el-checkbox>
                  <el-checkbox label="其他"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <div class="dotted-line"></div>
            <div class="item-title">项目简介</div>
            <el-form-item class="item-title-form">
              <el-input
                type="textarea"
                maxlength="200"
                v-model="editForm.projectProfile"
                show-word-limit
              ></el-input>
            </el-form-item>
            <div class="item-title">简要说明</div>
            <el-form-item class="item-title-form">
              <el-input
                type="textarea"
                maxlength="3000"
                v-model="editForm.briefDescription"
                show-word-limit
              ></el-input>
            </el-form-item>
            <div class="dotted-line"></div>
            <div class="item-title">附件</div>
            <div>
              <file-upload
                :fileType="['rar', 'zip', 'arj', 'z']"
                :fileSize="500"
                ref="myUpload"
                :fileList="fileList"
                :data="{}"
                @changeFile="onChange"
                multiple
                :limit="5"
              />
              <el-button
                icon="el-icon-circle-plus-outline"
                @click.native.prevent="upload"
                size="medium"
                type="primary"
                class="btn btn-xs btn-primary"
              >
                增加附件
              </el-button>
              <span class="el-upload-tip"
                >文件大小不超过500M
                <span class="ml0">文件格式以压缩包形式上传</span>
              </span>
            </div>
          </el-form>
        </div>
      </div>
      <!--  底部  -->
      <footer-btn />
      <div class="el-edit-form-footer">
        <el-button
          :loading="loadingEdit"
          size="medium"
          type="default"
          @click.native.prevent="handleLogin"
        >
          <span>保存草稿</span>
        </el-button>
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          class="beautiful-submit-btn"
          @click.native.prevent="submitBtnClick"
        >
          <span v-if="!loading">确认提交</span>
          <span v-else>提 交 中...</span>
        </el-button>
      </div>
    </div>
    <!-- 提交确认弹框 -->
    <el-dialog
      :visible.sync="open"
      width="3.7rem"
      custom-class="secondary-cartridge-modal"
      :show-close="false"
      center
    >
      <img
        class="dialog-close-img pointer"
        src="@/assets/beautiful/pc/close.png"
        alt="dark"
        @click="cancelBtnClick"
      />

      <div class="dialog-title text-center">承诺书</div>
      <p class="dialog-content-p">
        本人（组织）保证以上提交的材料内容真实、有效，并对材料内容的真实性负责。如有虚假，由本人（组织）承担相关法律责任。
      </p>
      <div class="dialog-footer">
        <el-button type="primary" class="w100" @click="handlerSubmit"
          >同意并提交</el-button
        >
      </div>
      <p class="text-error text-center mt20">
        温馨提示：材料提交成功后不可修改
      </p>
    </el-dialog>
  </div>
</template>

<script>
import { addDeclaration, updateDeclaration } from "@/api/beautiful";

// import FileUpload from "@/components/FileUpload";
import FileUpload from "./upload";
import NavBtn from "./nav.vue";
import FooterBtn from "./footer.vue";
import AddUser from "./addUser.vue";

export default {
  name: "editFrom",
  components: {
    NavBtn,
    FooterBtn,
    AddUser,
    FileUpload,
  },
  data() {
    return {
      provinceData: this.provinceData.Items[0],
      editForm: {
        title: "",
        unit: "",
        head: "",
        province: "",
        contactNumber: "",
        declareAuthors: [],
        projectType: [],
        projectField: [],
        attachUrl: [],
        projectProfile: "",
        briefDescription: "",
        ...this.$store.state.beautiful.declarationDetail,
      },
      editRules: {
        title: [{ required: true, trigger: "blur", message: "标题不能为空" }],
        unit: [
          { required: true, trigger: "blur", message: "所在单位不能为空" },
        ],
        contactNumber: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        head: [{ required: true, trigger: "blur", message: "负责人不能为空" }],
        province: [
          { required: true, trigger: "change", message: "省份不能为空" },
        ],
      },
      loading: false,
      loadingEdit: false,
      open: false,
    };
  },
  computed: {
    isEdit() {
      const value = this.editForm.saveType;
      return value && value === 1;
    },
    fileList() {
      const value = this.editForm.attachUrl;
      return value ? value : [];
    },
  },

  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  mounted() {
    this.$store
      .dispatch("beautiful/getDeclaration", {
        account: "18611432235",
      })
      .then((res) => {
        if (res) {
          this.editForm = { ...res };
        }
      });
  },
  methods: {
    changeAuthors(declareAuthors) {
      this.editForm = { ...this.editForm, declareAuthors };
    },
    changeDeclaration(param) {
      let params = { ...param };
      if (param.projectType.length) {
        params = { ...params, projectType: param.projectType.join(",") };
      }
      if (param.projectField.length) {
        params = { ...params, projectField: param.projectField.join(",") };
      }
      if (param.attachUrl.length) {
        params = { ...params, attachUrl: param.attachUrl.join(",") };
      }
      if (params.id) {
        // 编辑
        updateDeclaration(params)
          .then((res) => {
            this.loadingEdit = false;
            this.loading = false;

            if (res.isSuccess) {
              this.$message.success(
                this.isEdit ? "申报资料填写成功" : "已保存"
              );
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(() => {
            this.loadingEdit = false;
            this.loading = false;
          });
      } else {
        addDeclaration(params)
          .then((res) => {
            this.loadingEdit = false;
            this.loading = false;
            if (res.isSuccess) {
              this.$message.sucess("申报资料填写成功");
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(() => {
            this.loadingEdit = false;
            this.loading = false;
          });
      }
    },
    // 提交申报
    handlerSubmit() {
      this.loading = true;
      this.changeDeclaration({ ...this.editForm, saveType: 1 });
    },
    // 二级弹框取消按钮
    cancelBtnClick() {
      this.open = false;
    },
    // 提交按钮
    submitBtnClick() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.open = true;
        }
      });
    },
    // 保存草稿
    handleLogin() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.loadingEdit = true;
          this.changeDeclaration({ ...this.editForm, saveType: 0 });
        }
      });
    },

    onChange(attachUrl) {
      //监听文件变化，增减文件时都会被子组件调用
      this.$set(this.editForm, "attachUrl", [...attachUrl]);
    },
    upload() {
      //触发子组件的上传方法
      this.$refs.myUpload.btnChange();
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.beautiful-edit {
  background-color: #3975ff;
  padding-bottom: 0.9rem;

  .container {
    width: 53%;
    max-width: 10rem;
    margin: 0 auto;
    background: #edf5ff;
    font-size: 0.14rem;
    border-radius: 0.05rem 0.05rem 0px 0px;

    // 导航
    .nav-breadcrumb {
      color: #fff;
      background-color: #235ee6;
      border-radius: 0.05rem 0.05rem 0px 0px;
      padding: 0.16rem 0.2rem;
    }

    .edit-form-isSuccess {
      height: 0.54rem;
      background: #feffdd;
      display: flex;
      align-items: center;
      padding-left: 0.2rem;
      font-size: 0.18rem;
      font-family: AlibabaPuHuiTiM;
      color: #3975ff;
      line-height: 0.18rem;
    }

    .content-form {
      padding: 0.5rem 0.6rem;
      .item-title {
        // height: 18px;
        font-size: 0.18rem;
        font-family: AlibabaPuHuiTiM;
        color: #46454a;
        line-height: 0.18rem;
        margin-bottom: 0.18rem;
      }
      .dotted-line {
        border: 1px dashed rgba($color: #3975ff, $alpha: 0.3);
        margin: 0.3rem 0;
      }

      .flex.item-title {
        align-items: center;
        .item-title-form {
          margin: 0;
          .el-form-item__content {
            margin-left: 0.5rem !important;
            font-family: AlibabaPuHuiTiR;
            color: #46454a;
          }
        }
      }
      .item-title-form {
        // margin: 0;
        .el-form-item__content {
          margin-left: 0rem !important;
        }
      }
    }

    .el-upload-tip {
      margin-left: 0.1rem;
      font-size: 0.14rem;
      font-family: AlibabaPuHuiTiR;
      color: #ff7b00;
      line-height: 0.14rem;
    }
  }

  .el-edit-form-footer {
    height: 0.9rem;
    position: fixed;
    z-index: 3;
    text-align: center;
    bottom: 0;
    width: 100%;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
    background: #feffdd;
    padding-top: 0.2rem;
    .el-button {
      padding: 0.17rem 0;
      width: 2.2rem;
      font-size: 0.17rem;
      font-family: AlibabaPuHuiTiM;
    }
    .beautiful-submit-btn {
      margin-left: 1.1rem;
    }
  }
}
</style>
