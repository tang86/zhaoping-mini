//app.js
const host = 'http://localhost:8000/api';
App({
  onLaunch: function (option) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    let This = this
    // 小程序打开
    wx.login({
      success: function (res) {
        var code = res.code;
        if (res.code) {
          wx.getUserInfo({
            withCredentials: true,
            success: res => {
              getApp().globalData.userInfo = res.userInfo;
              wx.request({
                url: getApp().globalData.login.url,
                data: {
                  js_code: code,
                  name: res.userInfo.nickName,
                  head_url: res.userInfo.avatarUrl,
                },
                method: getApp().globalData.login.method,
                success: function (res) {
                  if (res.statusCode === 200) {
                    // 登录成功 将token存入本地
                    getApp().globalData._token = res.data.data._token;
                    getApp().globalData.userInfo.id = res.data.data.user.id;
                    getApp().globalData.userInfo.tel = res.data.data.user.tel;
                    getApp().globalData.userInfo.name = res.data.data.user.name;
                    getApp().globalData.userInfo.open_id = res.data.data.user.open_id;
                    getApp().globalData.userInfo.tel = res.data.data.user.tel;
                    getApp().globalData.userInfo.address = res.data.data.user.address;
                    getApp().globalData.userInfo.sex = res.data.data.user.sex;
                    getApp().globalData.userId = res.data.data.user.id;
                    // 分享进来的
                    if (option.query.order_id) {
                      getApp().globalData.order_id = option.query.order_id;
                      var order_id = option.query.order_id;
                      getApp().receiveOrder(order_id);
                      wx.switchTab({
                        url: 'pages/home/home'
                      })
                    }
                  }
                }
              });
            },
            fail: function (res) {
              // 分享进来的
              if (option.query.order_id) {
                getApp().globalData.order_id = option.query.order_id;
                wx.showModal({
                  title: '提示',
                  content: '请先进入我的页面登录再领取'
                })
              }
            }
          })
        }
      },
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // 过滤html标签
  convertHtmlToText: function convertHtmlToText(inputText) {
    var returnText = "" + inputText;
    returnText = returnText.replace(/<\/div>/ig, '\r\n');
    returnText = returnText.replace(/<\/li>/ig, '\r\n');
    returnText = returnText.replace(/<li>/ig, '  *  ');
    returnText = returnText.replace(/<\/ul>/ig, '\r\n');
    //-- remove BR tags and replace them with line break
    returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

    //-- remove P and A tags but preserve what's inside of them
    // returnText = returnText.replace(/<p.*?>/gi, "\r\n");
    returnText = returnText.replace(/<p.*?>/gi, "");
    returnText = returnText.replace(/<\/p>/ig, '\r\n');
    returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

    //-- remove all inside SCRIPT and STYLE tags
    returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
    returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
    //-- remove all else
    returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

    //-- get rid of more than 2 multiple line breaks:
    returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

    //-- get rid of more than 2 spaces:
    returnText = returnText.replace(/ +(?= )/g, '');

    //-- get rid of html-encoded characters:
    returnText = returnText.replace(/ /gi, " ");
    returnText = returnText.replace(/&/gi, "&");
    returnText = returnText.replace(/"/gi, '"');
    returnText = returnText.replace(/</gi, '<');
    returnText = returnText.replace(/>/gi, '>');

    return returnText;
  },

  globalData: {
    userInfo: {},
    _token: null,
    host: host,
    login: {
      url: host + '/login',
      method: 'post'
    },
    get_banner_news: {
      url: host + '/get_banner_news?num=3',
      method: 'get'
    },
    get_notices: {
      url: host + '/get_notices?num=3',
      method: 'get'
    },
    get_news: {
      url: host + '/news?per_page=5',
      method: 'get'
    },
    getOneNews: {
      url: host + '/news/',
      method: 'get'
    },
    getPositions: {
      url: host + '/positions',
      method: 'get'
    },
    getOnePosition: {
      url: host + '/position/',
      method: 'get'
    },
    getOneCompany: {
      url: host + '/company/',
      method: 'get'
    },
    getProfileCentre: {
      url: host + '/users/points',
      method: 'get'
    },
  }
})