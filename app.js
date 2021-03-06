//app.js
 //const host = 'http://localhost:8000/api';
const host = 'https://www.quyupin.com/api';
App({
  onLaunch: function (option) {

    // 登录
    let This = this
    // 小程序打开
    This.getUserInfo();
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('get setting');
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log('已经授权了');
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
        } else {
          console.log('未授权呢');
          wx.navigateTo({
            url: '/pages/index/index',
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

  getUserInfo: function () {
    console.log('执行getUserInfo');
    wx.login({
      success: function (res) {
        console.log(res);
        var code = res.code;
        if (res.code) {
          console.log('获取用户信息');
          wx.getUserInfo({
            withCredentials: true,
            success: res => {

              getApp().globalData.userInfo = res.userInfo;
              wx.request({
                url: getApp().globalData.login.url,
                method: getApp().globalData.login.method,
                data: {
                  js_code: code,
                  name: res.userInfo.nickName,
                  head_url: res.userInfo.avatarUrl,
                  inviter_id: getApp().globalData.inviter_id
                },
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

                  }
                }
              });
            },
            fail: function (res) {
              console.log(res);

            }
          });


        }
      },
    });

  },

  globalData: {
    inviter_id: null,
    userInfo: {},
    resume: {},
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
    getDistricts: {
      url: host + '/districts',
      method: 'get'
    },
    getConditions: {
      url: host + '/get-conditions',
      method: 'get'
    },
    getPositions: {
      url: host + '/positions',
      method: 'get'
    },
    getSentPositions: {
      url: host + '/sent-positions',
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
    getResume: {
      url: host + '/users/get-resume',
      method: 'get'
    },
    hasResume: {
      url: host + '/users/has-resume',
      method: 'get'
    },
    getIntentions: {
      url: host + '/intentions',
      method: 'get'
    },
    getCode: {
      url: host + '/code',
      method: 'get'
    },
    getPointsLogs: {
      url: host + '/users/points-logs',
      method: 'get'
    },
    getWithdrawLogs: {
      url: host + '/users/withdraw-logs',
      method: 'get'
    },
    getInviteLogs: {
      url: host + '/users/invite-logs',
      method: 'get'
    },
    getCompanyCategories: {
      url: host + '/get-company-categories',
      method: 'get'
    },
    postWithdraw: {
      url: host + '/users/withdraw',
      method: 'post'
    },
    postSendResume: {
      url: host + '/users/send-resume',
      method: 'post'
    },
    postUpdateUser: {
      url: host + '/users/update',
      method: 'post'
    },
    postBindMobile: {
      url: host + '/users/bind-mobile',
      method: 'post'
    },
    postResume: {
      url: host + '/users/resume/create-or-update',
      method: 'post'
    },
    isSent: {
      url: host + '/position/is-sent',
      method: 'get'
    },
    addExperience: {
      url: host + '/users/add-experience',
      method: 'post'
    },
    increasePointsRead: {
      url: host + '/credit/increase-points-read',
      method: 'post'
    },
    increasePointsShare: {
      url: host + '/credit/increase-points-share',
      method: 'post'
    },
  },


})