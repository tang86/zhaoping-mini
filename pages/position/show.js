// pages/position/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guid: null,
    isSent: false,
  },

  toCompany: function (option) {
    let company_id = option.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/company/company?company_id=' + company_id,
    })
  },
  sendResume: function (option) {
    let This = this;
    console.log(option);
    let data = {
      position_id: option.currentTarget.dataset.id
    };

    wx.request({
      url: getApp().globalData.postSendResume.url,
      method: getApp().globalData.postSendResume.method,
      data: data,
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getApp().globalData._token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          console.log(res);
          This.setData({
            isSent: true
          });

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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    // 拿到guid
    let This = this;
    This.setData({
      guid: option.guid
    });
    let data = {
      user_id: getApp().globalData.userInfo.id,
      position_id: option.guid
    };
    wx.request({
      url: getApp().globalData.isSent.url,
      method: getApp().globalData.isSent.method,
      data: data,
      success(res) {
        if (res.data.data) {
          This.setData({
            isSent: true
          });
        }
      }
    })
    wx.request({
      url: getApp().globalData.getOnePosition.url + option.guid,
      method: getApp().globalData.getOnePosition.method,
      header: {
        'Accept': 'application/json',
      },
      success(res) {
        res.data.data.content = getApp().convertHtmlToText(res.data.data.content);
        This.setData(res.data.data);
      }
    });
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