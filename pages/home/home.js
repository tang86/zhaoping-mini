var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    banners: [],
    news: [],
    notices: [],
    page: 1,
  },
  getBanners: function () {
    var This = this;
    wx.request({
      url: getApp().globalData.get_banner_news.url,
      method: getApp().globalData.get_banner_news.method,
      success: function (res) {
        if (res.statusCode === 200) {
          This.setData({
            banners: res.data.data,
          });

        } else {
          wx.showModal({
            title: '提示',
            content: '轮播数据加载失败'
          })
        }
      },
      error: function () {
        wx.showModal({
          title: '提示',
          content: '轮播数据加载失败'
        })
      }
    })
  },
  getNotices: function () {
    var This = this;
    wx.request({
      url: getApp().globalData.get_notices.url,
      method: getApp().globalData.get_notices.method,
      success: function (res) {
        if (res.statusCode === 200) {

          This.setData({
            notices: res.data.data,
          });
        } else {
          wx.showModal({
            title: '提示',
            content: '数据加载失败'
          })
        }
      },
      error: function () {
        wx.showModal({
          title: '提示',
          content: '数据加载失败'
        })
      }
    })
  },
  getNews: function (page = 1) {
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })  
    var This = this;
    wx.request({
      url: getApp().globalData.get_news.url,
      method: getApp().globalData.get_news.method,
      data:{page:page},
      success: function (res) {
        if (res.statusCode === 200) {
          let news = This.data.news;
          news = news.concat(res.data.data.data);
          This.setData({
            news: news,
          });
 
          if(res.data.data.data.length < 1) {
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
  toNewsDetail: function (data) {
    wx.navigateTo({
      url: '/pages/news/show?guid=' + data.currentTarget.dataset.id,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    if (JSON.stringify(e) != '{}') {
      console.log(e);
      if (e.hasOwnProperty('inviter_id')) {
        getApp().globalData.inviter_id = e.inviter_id;
      }

    }

    var This = this;
    This.getBanners();
    This.getNotices();
    This.getNews();
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
    let page = this.data.page;
    page += 1;
    this.getNews(page);
    this.setData({
      page: page
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})