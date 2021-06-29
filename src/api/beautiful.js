import request from "@/utils/request";

// 查看申报
export const getDeclarationDetail = query => {
  return request({
    url: "/declaration/detail",
    method: "get",
    params: query
  });
};

// 保存或提交申报
export function addDeclaration(data) {
  return request({
    url: "/declaration/add",
    method: "post",
    data: data
  });
}

// 编辑申报
export function updateDeclaration(data) {
  return request({
    url: "/declaration/update",
    method: "post",
    data: data
  });
}

// 上传附件
export function uploadFile(data) {
  return request({
    url: "/declaration/attach/upload",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data
  });
}

// 删除附件
export function deleteUpload(params) {
  return request({
    url: "/declaration/attach/delete",
    method: "get",
    params
  });
}
