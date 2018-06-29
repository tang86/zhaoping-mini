// pages/company/company.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company_id: null,
    activeInfo: 'active',
    isShowInfo: true,
    activePosition: '',
    isShowPosition: false,
    company:{},
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    banners: [
      {
        id: 1,
        banner: "../../images/index/banner.png",
      },
      {
        id: 2,
        banner: "../../images/index/banner-002.png",
      }
    ],
  },

  activeInfo: function(){
    this.setData(
      {
        activeInfo: 'active',
        isShowInfo: true,
        activePosition: '',
        isShowPosition: false,
      }
    );

  },
  activePosition: function () {
    this.setData(
      {
        activeInfo: '',
        isShowInfo: false,
        activePosition: 'active',
        isShowPosition: true,
      }
    );

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option);
    // 拿到guid
    let This = this;
    This.setData({
      company_id: option.company_id
    });
    wx.request({
      url: getApp().globalData.getOneCompany.url + option.company_id,
      method: getApp().globalData.getOneCompany.method,
      header: {
        'Accept': 'application/json',
      },
      success(res) {
console.log(res.data.data);
        This.setData({
          company: res.data.data
        });
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