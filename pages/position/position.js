// pages/position/position.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    positions: [],
  
  },
  getPositions: function (page = 1) {
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })
    var This = this;
    wx.request({
      url: getApp().globalData.getPositions.url,
      method: getApp().globalData.getPositions.method,
      data: { page: page },
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
  /**
 * 跳转到新闻详情页面
 */
  toPositonDetail: function (data) {
    wx.navigateTo({
      url: '/pages/position/show?guid=' + data.currentTarget.dataset.id,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.getPositions();
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