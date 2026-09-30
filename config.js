/* TZ Works 官网设定：首页、隐私声明和服务条款都读这里。 */
window.TZ = {
  // 表单电邮：backend/form-to-email 部署后得到的网址（以 /exec 结尾）。
  // 留空时表单只做预览；上线检查（tools/check-site.sh）会拦住没填的版本。
  formEndpoint: "https://script.google.com/macros/s/AKfycbxbiF9IqbYLUuIJAk4d1Ho1vq9jfsTgtVhNE_nEWnVxdlaNgwXg7UrQs0v-2QkKpoZaew/exec",

  // 联络资料：法规（2012 年电子交易规例）规定网站要公开电话和电邮，都以纯文字显示（不是连结）。
  // whatsapp 只填数字，包括国码。
  whatsapp: "601120900533",
  email: "",

  // SSM 注册好之后填：注册名称和注册号码，会显示在页脚、隐私声明和服务条款里。
  businessName: "",
  ssm: ""
};
