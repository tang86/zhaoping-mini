// pages/profile/bindPhone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seconds: 120,
    btnText: '获取动态码',
    timer: null,
    timerStatus: 'stop',
    code: null,
    mobile: null,
    serverCode: null,

  },
  mobileInput: function (e) {
    console.log(e.detail);
    this.setData({
      mobile: e.detail.value
    });
  },
  codeInput: function (e) {
    console.log(e.detail);
    this.setData({
      code: e.detail.value
    });
  },
  onSubmit: function (e) {
    console.log('提交');
    var This = this;
    var data = e.detail.value;
    if (data.mobile.length === 0) {
      wx.showModal({
        title: '提示',
        content: '请输入手机号'
      })
      return false;
    }
    if (data.code.length === 0) {
      wx.showModal({
        title: '提示',
        content: '请输入验证码'
      })
      return false;
    }

    if (parseInt(data.code) !== parseInt(This.data.serverCode)) {
      wx.showModal({
        title: '提示',
        content: '验证码不正确'
      })
      return false;
    }

    wx.request({
      url: getApp().globalData.postUpdateUser.url,
      method: getApp().globalData.postUpdateUser.method,
      data: data,
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getApp().globalData._token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          
          getApp().globalData.resume.mobile = This.data.mobile;
          wx.navigateBack()
        } else if (res.statusCode === 422) {
          var obj = res.data
          This.setData({
            disabled: false
          });
          wx.showModal({
            title: '提示',
            content: res.data.errors[Object.keys(res.data.errors)[0]][0]
          });
        } else {
          wx.showModal({
            title: '提示',
            content: '网络错误'
          })
        }
      },
      error: function () {
        wx.showModal({
          title: '提示',
          content: '提交失败'
        })
      }
    })
  },
  sendSMS: function () {
    let that = this;
    if (that.data.mobile === null) {
      wx.showModal({
        title: '提示',
        content: '请输入手机号'
      })
      return false;
    }
    if (that.data.mobile.length !== 11) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号'
      })
      return false;
    }
    let current_status = that.data.timerStatus;
    if (current_status == 'stop') {
      this.getCode();
      that.showSeconds();
      let timer = setInterval(function () {
        that.showSeconds();
      }, 1000);
      that.setData({
        timer: timer
      });
    }

  },
  getCode: function () {
    let This = this;
    let data = {
      mobile: This.data.mobile,
      type_name: "bind_phone",
    };
    wx.request({
      url: getApp().globalData.getCode.url,
      method: getApp().globalData.getCode.method,
      data: data,
      success: function (res) {
        This.setData({
          serverCode: res.data.data.code
        });
      }
    });

  },
  showSeconds: function () {
    let that = this;
    let current_text = '秒后重新发送';
    let current_seconds = that.data.seconds;

    let timer = that.data.timer;

    current_text = current_seconds + current_text;
    current_seconds -= 1;
    that.setData({
      btnText: current_text,
      seconds: current_seconds,
      timerStatus: 'starting',
    });

    if (current_seconds < 0) {
      clearInterval(timer);
      that.setData({
        btnText: '获取动态码',
        seconds: 120,
        timerStatus: 'stop',
      });
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})