import { getDeclarationDetail } from "@/api/beautiful";
import { splictArray } from "@/utils/ruoyi";

const state = {
  declarationDetail: {},
  account: null
};
const mutations = {
  CHANGE_DECLARATION: (state, value) => {
    state.declarationDetail = value;
  },
  CHANGE_ACCOUNT: (state, value) => {
    state.account = value;
  }
};

const actions = {
  // 修改布局设置
  getDeclaration({ commit }, data) {
    commit("CHANGE_ACCOUNT", data.account);
    return new Promise((resolve, reject) => {
      getDeclarationDetail(data)
        .then(res => {
          if (res.isSuccess && res.data) {
            const declarationDetail = { ...res.data };
            const { projectField, projectType, attachUrl } = declarationDetail;

            declarationDetail.projectField = splictArray(projectField);
            declarationDetail.projectType = splictArray(projectType);

            declarationDetail.attachUrl = splictArray(attachUrl);

            commit("CHANGE_DECLARATION", declarationDetail);
            resolve(declarationDetail);
          } else {
            resolve();
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
