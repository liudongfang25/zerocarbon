<template>
  <div class="beautiful-detail over-flow-content">
    <nav-btn />
    <div class="container">
      <div class="nav">
        <div
          v-for="item in btns"
          :key="item.id"
          :class="{
            'nav-item': true,
            active: selectActive === item.url,
          }"
          @click="() => changeNavType(item)"
        >
          <div
            :class="{
              'nav-item-span': true,
              'border-right': !item['noBorder'],
            }"
          >
            <a :href="`#${item.url}`">{{ item.name }}</a>
          </div>
        </div>
      </div>

      <!-- 内容 -->
      <div class="content">
        <div data-index="home" class="content-home margin-20-0-30-0">
          <a name="home"></a>
          <img
            src="@/assets/beautiful/pc/quotation-marks.png"
            alt="dark"
            class="content-home-quote"
          />
          <p class="text-indent-2">
            为深入学习宣传贯彻习近平生态文明思想，贯彻落实习近平总书记关于应对气候变化等重要指示批示精神，服务国家碳达峰、碳中和重大战略需求，拟面向青少年开展全国青少年零碳科技项目（创意）征集展示交流活动。具体事项通知如下。
          </p>
          <img
            src="@/assets/beautiful/pc/quote-below.png"
            alt="dark"
            class="content-home-quote-below"
          />
        </div>
        <a name="theme"></a>
        <!-- 活动主题 -->
        <div data-index="theme" class="content-theme">
          <img src="@/assets/beautiful/pc/title-1.png" alt="dark" />
          <img
            src="@/assets/beautiful/pc/theme.png"
            alt="dark"
            class="margin-20-0-30-0"
          />
        </div>
        <!-- 活动组织 -->
        <div data-index="activity" class="content-activity">
          <a name="activity"></a>

          <img src="@/assets/beautiful/pc/title-2.png" alt="dark" />
          <div class="margin-20-0-30-0 content-card padding-50-63">
            <div class="content-card-item">
              <span class="content-card-item-label">指导单位：</span
              ><span>共青团中央</span>
            </div>
            <div class="content-card-item">
              <span class="content-card-item-label">主办单位：</span
              ><span>内蒙古自治区团委、呼和浩特市政府</span>
            </div>
            <div class="content-card-item">
              <span class="content-card-item-label">赞助单位：</span
              ><span>中国节能环保集团、中国青年创业就业基金会</span>
            </div>
            <div class="content-card-item">
              <span class="content-card-item-label">技术支持单位：</span>
              <span
                >北京理工大学能源与环境政策研究中心、中国优选法统筹法与经济数学研究会能源经济与管理研究分会</span
              >
            </div>
          </div>
        </div>
        <!-- 参选对象 -->
        <div data-index="candidates" class="content-candidates">
          <a name="candidates"></a>

          <img src="@/assets/beautiful/pc/title-3.png" alt="dark" />
          <div class="margin-20-0-30-0 content-card">
            <p class="text-indent-2 padding-50-63">
              学校、科研机构、青年社会组织和相关创业团队等组织中的集体（团队）或个人。以个人名义参加的参会对象年龄不超过35周岁；以集体名义参加的主要负责人年龄须为45周岁（含）以下、且35周岁以下青少年占主体的2/3，或者集体的主要服务对象为青少年。
            </p>
            <div class="content-card-btns text-center">
              <el-row justify="space-between">
                <el-col :span="12" class="border-right">
                  <div class="grid-content bg-purple-dark">
                    35周岁（含）以下
                  </div>
                  <div>以个人名义参加</div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content bg-purple-dark">
                    45周岁（含）以下
                  </div>
                  <div>以集体名义参加</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <!-- 活动组别 -->
        <div data-index="group" class="content-group">
          <a name="group"></a>
          <img src="@/assets/beautiful/pc/title-4.png" alt="dark" />
          <div class="margin-20-0-30-0 content-card padding-50-63">
            <div class="content-card-item flex">
              <img src="@/assets/beautiful/pc/order-1.png" alt="dark" />
              <div class="ml0">
                <div class="content-card-item-label">零碳科技优秀成果</div>
                <div>
                  主要分为零碳科技创新技术成果征集，参与征集的个人或团队应提供相应实物或技术模型；零碳科技理念及构想创意征集，参与征集的个人或团队应有原创、完整、独立的理念或创意；零碳社会动员类科技公益产品，参与征集的个人或团队应在比赛阶段提供满足基本演示需求的网络科技程序或工具。
                </div>
              </div>
            </div>
            <div class="content-card-item flex">
              <img src="@/assets/beautiful/pc/order-2.png" alt="dark" />
              <div class="ml0">
                <div class="content-card-item-label">零碳科技创新论文</div>
                <div>
                  参与征集的个人或团队围绕活动主题，开展学术研究，按要求提交学术报告、论文、调研成果等。
                </div>
              </div>
            </div>
            <div class="content-card-item flex">
              <img src="@/assets/beautiful/pc/order-3.png" alt="dark" />
              <div class="ml0">
                <div class="content-card-item-label">零碳科技创意作品</div>
                <div>
                  参与征集的个人或团队围绕青年参与零碳科技创新主题进行创作，作品可通过漫画、照片、微电影、纪实短片、视频剪辑、公益广告、卡通动漫等形式提交。
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 项目(创意)领域 -->
        <div data-index="creative" class="content-creative">
          <a name="creative"></a>
          <img src="@/assets/beautiful/pc/title-5.png" alt="dark" />
          <div class="margin-20-0-30-0 content-card padding-50-63">
            <p class="text-indent-2 mb20">
              围绕 "绿色生产、低碳生活、零碳教育、区域环境治理改善"
              等四个重点领域开展项目设计。每人或每个团队限报1件作品或项目，每个参会作品或项目只可选择1个组别，不兼报。
            </p>
            <div class="content-card-btns mt10">
              <div class="content-card-item flex mb20">
                <img src="@/assets/beautiful/pc/creativity.png" alt="dark" />
                <div class="ml0">
                  <div class="content-card-item-label m0">绿色生产</div>
                  <div>
                    聚焦工业、建筑、交通等领域节能降耗、清洁能源开发利用、碳汇等领域，围绕减碳监测、智慧节能、能源互联网、碳中和创新、碳捕集等开展的项目、理念或技术革新。
                  </div>
                </div>
              </div>
              <div class="content-card-item flex mb20">
                <img src="@/assets/beautiful/pc/creativity.png" alt="dark" />
                <div class="ml0">
                  <div class="content-card-item-label m0">低碳生活</div>
                  <div>
                    聚焦公共交通、绿色消费、国土绿化、资源节约等领域，围绕节水节电节粮、合理消费、低碳出行、旧物利用、减少排放等开展的项目、理念或动员方式创新。
                  </div>
                </div>
              </div>
              <div class="content-card-item flex mb20">
                <img src="@/assets/beautiful/pc/creativity.png" alt="dark" />
                <div class="ml0">
                  <div class="content-card-item-label m0">零碳教育</div>
                  <div>
                    运用大数据、人工智能、物联网、互联网、移动端APP、小程序等互联网科技手段，面向公众普及减排知识、提高零碳认知能力、增强低碳意识、辅助开展低碳社会实践的项目、理念或互联网工具。
                  </div>
                </div>
              </div>
              <div class="content-card-item flex">
                <img src="@/assets/beautiful/pc/creativity.png" alt="dark" />
                <div class="ml0">
                  <div class="content-card-item-label m0">区域环境治理改善</div>
                  <div>
                    聚焦国家区域环境治理战略，围绕减排与大气污染防治、固废分类与处理、资源循环利用等协同领域开展的项目、理念或技术革新。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 流程安排 -->
        <div data-index="arrangement" class="content-arrangement">
          <a name="arrangement"></a>

          <img src="@/assets/beautiful/pc/title-6.png" alt="dark" />
          <div class="margin-20-0-30-0 content-card padding-50-63">
            <div class="content-card-item flex mb20">
              <img src="@/assets/beautiful/pc/order-1.png" alt="dark" />
              <div class="ml0">
                <div class="content-card-item-label">报名阶段（7—8月）</div>
                <div>
                  按要求在规定时间通过“全国青少年生态文明教育中心”微信公众号、“志愿中国”网站（www.zyz.org.cn）及“志愿汇”APP填写参评个人或团队信息并提交相关材料，由各省级团委审核后，报共青团中央审核。
                </div>
              </div>
            </div>
            <div class="content-card-item flex mb20">
              <img src="@/assets/beautiful/pc/order-2.png" alt="dark" />
              <div class="ml0">
                <div class="content-card-item-label">评审阶段（8月）</div>
                <div>
                  专家评审委员会对参赛的零碳科技项目（创意）作品进行初审、复审后，评审委员会进入会商程序。
                </div>
              </div>
            </div>
            <div class="content-card-item flex mb20">
              <img src="@/assets/beautiful/pc/order-3.png" alt="dark" />
              <div class="ml0">
                <div class="content-card-item-label">入围公示（8月）</div>
                <div>
                  获奖的青少年零碳科技项目（创意），将在中国青年报、中国共青团网、志愿中国以及全国青少年生态文明教育中心公示。
                </div>
              </div>
            </div>
            <div class="content-card-item flex mb20">
              <img src="@/assets/beautiful/pc/order-4.png" alt="dark" />
              <div class="ml0">
                <div class="content-card-item-label">能力提升（9月）</div>
                <div>
                  分领域邀请相关青年专家、学者担任青少年零碳科技项目（创意）导师，对入围的个人或团队进行为期一个月的跟踪辅导，从项目设计、方案优化、成果转化等多方面帮助全面提升实践创新能力。
                </div>
              </div>
            </div>
            <div class="content-card-item flex">
              <img src="@/assets/beautiful/pc/order-5.png" alt="dark" />
              <div class="ml0">
                <div class="content-card-item-label">
                  集中展示交流阶段（10月）
                </div>
                <div>
                  建立线上展示页面，为入围青年零碳科技项目（创意）提供集中展示交流平台。同时，遴选部分优秀作品或项目参加线下集中展示交流会，开展项目展示推介，提供落地资源支持。
                </div>
              </div>
            </div>
            <!-- 虚线 -->
            <div class="dotted-line"></div>
          </div>
        </div>

        <!-- 有关要求 -->
        <div data-index="requirements" class="content-requirements">
          <a name="requirements"></a>
          <img src="@/assets/beautiful/pc/title-7.png" alt="dark" />
          <div class="margin-20-0-30-0 content-card padding-50-63">
            <div class="content-card-item flex">
              <img src="@/assets/beautiful/pc/order-1.png" alt="dark" />
              <div class="ml0">
                <div class="content-card-item-label">征集阶段</div>
                <div>
                  各级团组织广泛动员，在坚持公平公开原则的基础上遴选优秀作品或项目进行推荐。每个省份每个组别推荐作品或项目不超过20个。
                </div>
              </div>
            </div>
            <div class="content-card-item flex">
              <img src="@/assets/beautiful/pc/order-2.png" alt="dark" />
              <div class="ml0">
                <div class="content-card-item-label">遴选阶段</div>
                <div>
                  建立项目征集遴选专家组，对征集的作品及项目进行评审，遴选零碳科技优秀成果共计100个左右、零碳科技创新论文共计100篇左右、零碳科技创意作品100个左右。
                </div>
              </div>
            </div>
            <div class="content-card-item flex">
              <img src="@/assets/beautiful/pc/order-3.png" alt="dark" />
              <div class="ml0">
                <div class="content-card-item-label">展示交流阶段</div>
                <div>邀请部分优秀作品或项目参加集中展示交流活动。</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 联系方式 -->
        <div class="content-contact">
          <div>联 系 人 ：李璐洁 陈晟</div>
          <div>联系电话：010—85212628 85212606</div>
          <div>电子邮箱：shdyc2018@ 163.com</div>
          <div>技术支持：010—******</div>
        </div>
      </div>
    </div>
    <!--  底部  -->
    <footer-btn />
  </div>
</template>

<script>
import NavBtn from "./nav.vue";
import FooterBtn from "./footer.vue";

const btns = [
  { id: 0, url: "home", name: "首页" },
  { id: 1, url: "theme", name: "活动主题" },
  { id: 2, url: "activity", name: "活动组织" },
  { id: 3, url: "candidates", name: "参选对象" },
  { id: 4, url: "group", name: "活动组别" },
  { id: 5, url: "creative", name: "项目(创意)领域" },
  { id: 6, url: "arrangement", name: "流程安排" },
  { id: 7, url: "requirements", name: "有关要求", noBorder: true },
];

export default {
  name: "Login",
  components: {
    NavBtn,
    FooterBtn,
  },
  data() {
    return {
      btns,
      selectActive: btns[0].url,
      distance: 0,
    };
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
    this.$store.dispatch("beautiful/getDeclaration", {
      account: "18611432235",
    });
  },
  created() {
    window.addEventListener("scroll", this.onscroll, true);
  },
  methods: {
    changeNavType(item) {
      this.selectActive = item.url;
    },
    onscroll() {
      //s滚动的距离，offset默认为元素距离顶部的距离
      var s = document.querySelector(".beautiful-detail").scrollTop || 0,
        dom = document.querySelector(".nav"),
        offset = dom.offsetTop - 60;
      this.distance = Math.max(offset, this.distance);
      offset = this.distance;
      const isFixed = s > offset && s > 0;
      dom.style.position = isFixed ? "fixed" : "relative";
      dom.style.top = isFixed ? "0.6rem" : 0;
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.onscroll);
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.beautiful-detail {
  background: #3975ff;
  color: #fff;
  font-size: 0.18rem;

  .container {
    width: 53%;
    max-width: 10rem;
    margin: 0 auto;
    background-color: #3975ff;

    // 导航
    .nav {
      display: flex;
      position: relative;
      z-index: 3;
      .nav-item {
        background-color: #edf5ff;
        font-size: 0.16rem;
        font-family: AlibabaPuHuiTiM;
        color: #1344d5;
        width: 1.24rem;
        text-align: center;
        padding: 0.1rem 0;
        .nav-item-span {
          position: relative;
          z-index: 3;
          border-color: #3975ff;
        }
      }
      .nav-item.active {
        color: #fff;
        background-color: transparent;
      }
      .nav-item.active::before {
        content: "";
        display: block;
        background-image: url("../../assets/beautiful/pc/menu.png");
        height: 0.5rem;
        width: 1.24rem;
        position: absolute;
        z-index: 1;
        top: -0.04rem;
        background-color: transparent;
      }
    }
    // 内容
    .content {
      width: 100%;
      .content-home {
        margin-top: 0.24rem;
        padding: 0.5rem 0.63rem;
        background: url("../../assets/beautiful/pc/home-bg.png") no-repeat
          center;
        width: 100%;
        height: 1.93rem;
        position: relative;
        z-index: 1;
        .content-home-quote {
          position: absolute;
          left: 0.4rem;
          top: 0.4rem;
          width: 0.15rem;
        }
        .content-home-quote-below {
          position: absolute;
          right: 0.71rem;
          width: 0.15rem;
          bottom: 0.44rem;
        }
      }

      .content-activity {
        .content-card-item {
          margin-bottom: 0.2rem;
          display: flex;
          span {
            display: block;
            // box-sizing: border-box;
            // word-wrap: break-word;
            word-break: normal;
            font-family: AlibabaPuHuiTiR;
          }
          .content-card-item-label {
            padding-left: 0.04rem;
            background: url("../../assets/beautiful/pc/organization.png")
              no-repeat 0 0.15rem;
            font-family: AlibabaPuHuiTiM;
            min-width: 1.3rem;
          }
        }
        .content-card-item:last-child {
          margin: 0;
        }
      }

      .content-candidates {
        .text-indent-2 {
          padding-bottom: 0.24rem;
        }
        .content-card-btns {
          padding: 0.25rem;
          height: 1.04rem;
          background: #d7eaff;
          border-radius: 0px 0px 0.1rem 0.1rem;
          .border-right {
            border-color: #3975ff;
          }
        }
      }

      .content-group,
      .content-creative,
      .content-arrangement,
      .content-requirements {
        .content-card-item {
          align-items: flex-start;
          .content-card-item-label {
            margin: 0.14rem 0;
            font-size: 0.2rem;
            font-family: AlibabaPuHuiTiM;
          }
          .m0 {
            margin: 0;
          }
        }
      }

      .content-arrangement .content-card {
        position: relative;
        overflow: hidden;
        .dotted-line {
          border: 1px dashed rgba(57, 117, 255, 0.3);
          margin: 0.3rem 0;
          width: 0;
          height: calc(100% - 185px);
          position: absolute;
          top: 50px;
          left: 84px;
        }
        .content-card-item > img {
          background-color: #edf5ff;
          position: relative;
          z-index: 1;
        }
      }

      .content-contact {
        height: 1.87rem;
        background: linear-gradient(
          180deg,
          rgba(47, 100, 255, 0.5) 0%,
          #2a61ff 100%
        );
        border-radius: 0.1rem;
        padding: 0.44rem 0.6rem;
        font-size: 0.18rem;
        font-family: AlibabaPuHuiTiR;
        color: #ffffff;
        line-height: 0.25rem;
        margin: 0.2rem 0;
      }
    }
  }

  .nav-footer {
    height: 1.62rem;
    background: #134cec;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
