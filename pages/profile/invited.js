// pages/profile/invited.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invitees: [],
    points: 0,
    invite_users: 0,
    complete_resume_number: 0,
  
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
    this.getInviteLogs();
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
  
  },
  getInviteLogs: function () {
    var This = this;
    wx.request({
      url: getApp().globalData.getInviteLogs.url,
      method: getApp().globalData.getInviteLogs.method,
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getApp().globalData._token
      },
      success: function (res) {
        console.log(res.data.data);
        if (res.statusCode === 200) {
          This.setData({
            invitees: res.data.data.invite_user_points_logs,
            points: res.data.data.points,
            invite_users: res.data.data.invite_users,
            complete_resume_number: res.data.data.complete_resume_number,
          });


        } else {
          wx.showModal({
            title: '提示',
            content: '数据加载失败'
          })
        }
        // 隐藏加载框  
        wx.hideLoading();
      },
      error: function () {
        wx.showModal({
          title: '提示',
          content: '数据加载失败'
        })
      }
    })
  }

})