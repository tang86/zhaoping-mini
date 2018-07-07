// pages/news/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guid: null
  },
  increasePointsRead: function () {
    let that = this;
    let data = {
      code: 'news_id_'+this.data.guid
    };
    wx.request({
      url: getApp().globalData.increasePointsRead.url,
      method: getApp().globalData.increasePointsRead.method,
      data: data,
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getApp().globalData._token
      },
      success(res) {

        if (res.data.data.status == 1) {
          that.toast.toastShow('阅读文章+1积分');
        } else {

        }
        

      }
    });
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

    wx.request({
      url: getApp().globalData.getOneNews.url + option.guid,
      method: getApp().globalData.getOneNews.method,
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getApp().globalData._token
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
    //获得toast组件
    this.toast = this.selectComponent("#toast");
    this.increasePointsRead();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   // this.toast.toastShow('阅读文章+1积分');
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