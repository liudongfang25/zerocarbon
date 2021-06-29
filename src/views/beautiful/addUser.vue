<template>
  <div class="beautiful-edit-table">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          size="medium"
          @click="handleAdd"
          :disabled="sourceList.length === maxlength"
          >添加作者</el-button
        >
        <span class="text-warning">最多可添加{{ maxlength }}人</span>
      </el-col>
    </el-row>

    <el-table :data="sourceList" v-if="sourceList.length">
      <el-table-column label="姓名" align="center" key="name" prop="name" />
      <el-table-column label="所在单位" align="center" key="uint" prop="uint" />
      <el-table-column
        label="职务"
        align="center"
        key="position"
        prop="position"
      />
      <el-table-column label="邮箱" align="center" key="email" prop="email" />
      <el-table-column
        label="手机号码"
        align="center"
        key="contact_number"
        prop="contact_number"
      />

      <el-table-column
        label="操作"
        align="center"
        width="160"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="6rem">
      <el-form ref="userForm" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model="form.name"
                placeholder="请填写姓名"
                maxlength="30"
              />
            </el-form-item>
            <el-form-item label="所在单位" prop="uint">
              <el-input v-model="form.uint" placeholder="请填写所在单位" />
            </el-form-item>
            <el-form-item label="职务" prop="position">
              <el-input v-model="form.position" placeholder="请填写职务" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱"
                maxlength="50"
              />
            </el-form-item>
            <el-form-item label="手机号码" prop="contact_number">
              <el-input
                v-model="form.contact_number"
                placeholder="请输入手机号码"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "addUser",
  props: {
    sourceList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      form: {},
      maxlength: 6,
      editIndex: null,
      title: "",
      open: false,
      rules: {
        phone: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    /**清除form */
    reset() {
      this.form = {
        name: undefined,
        uint: undefined,
        position: undefined,
        email: undefined,
        contact_number: undefined,
      };
      this.resetForm("userForm");
      this.editIndex = null;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加用户";
    },
    /** 弹框添加按钮 */
    submitForm: function () {
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          this.open = false;
          let declareAuthors = [...this.sourceList];
          if (this.editIndex !== null) {
            declareAuthors.splice(this.editIndex, 1, { ...this.form });
          } else {
            declareAuthors = declareAuthors.concat([{ ...this.form }]);
          }

          this.$emit("changeAuthors", declareAuthors);
        }
      });
    },
    /** 修改按钮操作 */
    handleUpdate({ row, $index }) {
      this.reset();
      if (this.sourceList[$index]) {
        const vaule = this.sourceList[$index];
        this.open = true;
        this.title = "编辑用户";
        this.editIndex = $index;
        this.form = { ...vaule };
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const userIds = row.userId || this.ids;
      this.$confirm(
        '是否确认删除用户编号为"' + userIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delUser(userIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
.beautiful-edit-table {
  .text-warning {
    font-size: 0.14rem;
    font-family: AlibabaPuHuiTiR;
    margin-left: 0.1rem;
  }
}
</style>
