// pages/profile/name.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onSubmit: function (e) {
    var This = this;
    var data = e.detail.value;
    if (data.name.length === 0) {
      wx.showModal({
        title: '提示',
        content: '请输入姓名'
      })
      return false;
    }
    wx.request({
      url: getApp().globalData.postResume.url,
      method: getApp().globalData.postResume.method,
      data: data,
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getApp().globalData._token
      },
      success: function (res) {
        if (res.statusCode === 200) {
console.log(res);

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