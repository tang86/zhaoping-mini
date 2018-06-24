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
  
  },

  sendSMS: function () {
    let that = this;
    let current_status = that.data.timerStatus;
    if (current_status == 'stop') {
      that.showSeconds();
      let timer = setInterval(function () {
        that.showSeconds();
      }, 1000);
      that.setData({
        timer: timer
      });
    }

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