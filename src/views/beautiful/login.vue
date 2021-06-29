<template>
  <div class="login-modal">
    <span class="nav-img-btn border-right" @click="openFormModal">登录</span>

    <el-dialog
      :visible.sync="open"
      width="3.7rem"
      custom-class="secondary-cartridge-modal login-form-modal"
      :show-close="false"
      center
    >
      <img
        class="dialog-close-img pointer"
        src="@/assets/beautiful/pc/close.png"
        alt="dark"
        @click="cancelBtnClick"
      />
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form w100"
      >
        <div class="dialog-title text-center mt10">登录</div>
        <div class="login-item mt20 mb5">
          <img
            class="label-icon"
            src="@/assets/beautiful/pc/user.png"
            alt="dark"
          />
          <el-form-item prop="username" style="width: 100%">
            <el-input
              v-model="loginForm.username"
              type="text"
              auto-complete="off"
              placeholder="账号"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="login-item mt20">
          <img
            class="label-icon"
            src="@/assets/beautiful/pc/pwd.png"
            width="18"
            alt="dark"
          />
          <el-form-item prop="password" style="width: 100%">
            <el-input
              v-model="loginForm.password"
              type="password"
              auto-complete="off"
              placeholder="密码"
              @keyup.enter.native="handleLogin"
            >
            </el-input>
          </el-form-item>
        </div>

        <div class="error-info">
          <span>账号或密码错误</span>
          <span class="forget-pwd">忘记密码</span>
        </div>
        <el-form-item class="w100 login-btns">
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width: 100%"
            @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";

export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        username: "admin",
        password: "admin123",
        rememberMe: false,
        code: "",
        uuid: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
        ],
        code: [
          { required: true, trigger: "change", message: "验证码不能为空" },
        ],
      },
      loading: false,
      redirect: undefined,
      open: false,
    };
  },
  methods: {
    cancelBtnClick() {
      this.open = false;
    },

    openFormModal() {
      this.open = true;
    },

    getCode() {
      getCodeImg().then((res) => {
        this.codeUrl = "data:image/gif;base64," + res.img;
        this.loginForm.uuid = res.uuid;
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), {
              expires: 30,
            });
            Cookies.set("rememberMe", this.loginForm.rememberMe, {
              expires: 30,
            });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" }).catch(() => {});
            })
            .catch(() => {
              this.loading = false;
              this.getCode();
            });
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login-form-modal {
  .el-dialog__body {
    padding-bottom: 0.25rem;

    .error-info {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #ff001f;
      display: flex;
      justify-content: space-between;
      .forget-pwd {
        color: #3975ff;
      }
    }

    .login-item {
      display: flex;
      .label-icon {
        width: 0.18rem;
        height: 0.24rem;
        margin-right: 0.2rem;
      }

      .el-input {
        border: none;
        .el-input__inner {
          font-size: 0.16rem;
          font-family: MicrosoftYaHei;
          border: none;
          width: 100%;
          border-radius: 0;
          border-bottom: 1px solid #adc6ff;
        }
      }
    }
    .login-btns {
      margin-bottom: 0;
      margin-top: 0.4rem;
      .el-button {
        height: 0.5rem;
        background: #3975ff;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        color: #ffffff;
      }
    }
  }
}
</style>
