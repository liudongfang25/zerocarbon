<template>
  <div class="beautiful-nav">
    <div class="nav-top"></div>
    <div class="nav-bottom">
      <img class="nav-img" src="@/assets/beautiful/pc/banner.png" alt="dark" />
      <div class="nav-img-btns">
        <login-form></login-form>
        <span class="nav-img-btn">注册</span>
      </div>
      <router-link to="/beautiful/edit" v-if="!isEnterBtn">
        <el-dropdown-item>
          <div
            class="nav-img-footer nav-img-edit-footer"
            v-if="declarationDetail && declarationDetail.saveType !== 1"
          >
            <img
              src="@/assets/beautiful/pc/edit-yes.png"
              width="22"
              class="mr5"
              alt="dark"
            />
            <span class="mr5">{{
              declarationDetail.saveType === 2 ? "已预约" : "已申报"
            }}</span>
            <a style="text-decoration: underline">{{
              declarationDetail.saveType === 2
                ? "马上完善我的申报信息"
                : "查看申报信息"
            }}</a>
          </div>
          <div class="nav-img-footer" v-else>
            <span>我要申报</span>
            <img src="@/assets/beautiful/pc/enter.png" alt="dark" />
          </div>
        </el-dropdown-item>
      </router-link>
    </div>
  </div>
</template>

<script>
import LoginForm from "./login.vue";

export default {
  name: "topNar",
  components: {
    LoginForm,
  },
  props: {
    isEnterBtn: [Boolean, false],
  },
  data() {
    return {};
  },
  computed: {
    declarationDetail() {
      const value = this.$store.state.beautiful.declarationDetail;
      return { saveType: 0, ...value };
    },
  },
  created() {},
  methods: {},
};
</script>

<style rel="stylesheet/scss" lang="scss">
.beautiful-nav {
  background: #3975ff;
  color: #fff;
  font-size: 0.18rem;

  .nav-top {
    width: 100%;
    height: 0.1rem;
    background: #235ee6;
    position: fixed;
    top: 0;
    z-index: 3;
  }

  .nav-bottom {
    width: 100%;
    position: relative;
    .nav-img {
      width: 100%;
    }
    .nav-img-btns {
      background: url("../../assets/beautiful/pc/login-btn.png") no-repeat
        center;
      position: fixed;
      top: 0.1rem;
      z-index: 3;
      right: calc(24% - .2rem);
      font-size: 0.14rem;
      width: 1.58rem;
      height: 0.34rem;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .nav-img-btn {
        padding: 0rem 0.21rem;
      }
    }
    .nav-img-footer {
      position: absolute;
      color: #144fd7;
      width: 2.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      left: 50%;
      font-family: AlibabaPuHuiTiM;
      bottom: 0.4rem;
      line-height: 0.56rem;
      font-size: 0.26rem;
      border-radius: 0.35rem;
      transform: translateX(-50%);
      background: linear-gradient(180deg, #7ff66c 0%, #66fa42 100%);
      box-shadow: 0px 0.04rem 0.1rem 0px rgba(0, 68, 159, 0.5);
    }

    .nav-img-edit-footer {
      background: linear-gradient(180deg, #2c6cff 0%, #1355ff 100%);
      box-shadow: 0rem 0.06rem 0.1rem 0rem rgba(0, 79, 255, 0.5);
      color: #7ef66b;
      width: auto;
      font-size: 0.22rem;
      padding: 0 0.32rem;
      > img {
        vertical-align: middle;
      }
    }
  }
}
</style>

