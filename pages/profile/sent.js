// pages/profile/sent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    positions: [],
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
    this.getPositions();
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
    let page = this.data.page;
    page += 1;
    this.getPositions(page);
    this.setData({
      page: page
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getPositions: function (page = 1) {
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })
    var This = this;
    wx.request({
      url: getApp().globalData.getSentPositions.url,
      method: getApp().globalData.getSentPositions.method,
      data: { 
        page: page ,
        user_id: getApp().globalData.userInfo.id
        },
      success: function (res) {
        console.log(res.data.data.data);
        if (res.statusCode === 200) {
          let positions = This.data.positions;

          positions = positions.concat(res.data.data.data);
          This.setData({
            positions: positions,
          });

          if (res.data.data.data.length < 1) {
            wx.showToast({
              title: '没有内容了',
            })
          }
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
  },
})