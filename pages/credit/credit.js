// pages/credit/credit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: {
      points: 1,
      withdraw: 1,
    },
    page_size: 10,
    pointsLogs: [],
    withdrawLogs: [],
    points: 0,
    money: 0,
    activeCredit: 'active',
    isShowCredit: true,
    activeWithdraw: '',
    isShowWithdraw: false,
    cardSelected: 0,
    cards: {
      first: {
        img:'../../images/wode/ic_choice_gray.png',
        value: 100,
        },
      second: {
        img: '../../images/wode/ic_choice_gray.png',
        value: 200,
      },
      third: {
        img: '../../images/wode/ic_choice_gray.png',
        value: 300,
      },
    }
  },
  toastShow: function (str) {
    var _this = this;
    _this.setData({
      isShow: true,
      txt: str
    });
    setTimeout(function () {    //toast消失
      _this.setData({
        isShow: false
      });
    }, 2000);
  },
  activeCredit: function () {
    this.setData(
      {
        activeCredit: 'active',
        isShowCredit: true,
        activeWithdraw: '',
        isShowWithdraw: false,
      }
    );

  },
  selectCard: function (data) {
    let selected_key = data.currentTarget.dataset.key;
    let selected_img = '../../images/wode/ic_choice_light.png';
    let img = '../../images/wode/ic_choice_gray.png';
    let cards = this.data.cards;
    for (let key in cards) {
      if (key === selected_key) {
        cards[key].img = selected_img;
      } else {
        cards[key].img = img;
      }
    }
    
    this.setData({
      cards: cards,
      cardSelected: cards[selected_key].value,
    });
  },
  activeWithdraw: function () {
    this.setData(
      {
        activeCredit: '',
        isShowCredit: false,
        activeWithdraw: 'active',
        isShowWithdraw: true,
      }
    );

  },
  onWithdraw: function () {
    let that = this;
    if (that.data.cardSelected === 0) {
      that.toastShow("请选择提现额度");
      return false;
    }
    if (that.data.cardSelected > that.data.money) {
      that.toastShow("抱歉，您的余额不足以兑换该额度");
      return false;
    }
    //
    that.withdraw();
  },

  withdraw: function () {
    wx.showLoading({
      title: '请求中',
    })

    let This = this;
    let data = {
      money: This.data.cardSelected
    };
    wx.request({
      url: getApp().globalData.postWithdraw.url,
      method: getApp().globalData.postWithdraw.method,
      data: data,
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getApp().globalData._token
      },
      success: function (res) {
        if (res.statusCode === 200) {
        
          This.setData({
            points: res.data.data.points,
            money: res.data.data.money
          });

          //重新请求提现记录
          This.getWithdrawLogs(1);

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

        // 隐藏加载框  
        wx.hideLoading();
      },
      error: function () {
        // 隐藏加载框  
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '提交失败'
        })
      }
    })


  },

  getWithdrawLogs: function (page = 1) {
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })
    let This = this;
    let data = {
      page: page,
      page_size: This.data.page_size
    };
    wx.request({
      url: getApp().globalData.getWithdrawLogs.url,
      method: getApp().globalData.getWithdrawLogs.method,
      data: data,
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getApp().globalData._token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          let withdrawLogs = This.data.withdrawLogs;
          if (page === 1) {
            withdrawLogs = res.data.data.data;
          } else {
            withdrawLogs = withdrawLogs.concat(res.data.data.data);
          }
          
          This.setData({
            withdrawLogs: withdrawLogs
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
        // 隐藏加载框  
        wx.hideLoading();
      },
      error: function () {
        // 隐藏加载框  
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '提交失败'
        })
      }
    })
  },
  getPointsLogs: function (page = 1) {
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })
    let This = this;
    let data = {
      page: page,
      page_size: This.data.page_size
    };
    wx.request({
      url: getApp().globalData.getPointsLogs.url,
      method: getApp().globalData.getPointsLogs.method,
      data: data,
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getApp().globalData._token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          let pointsLogs = This.data.pointsLogs;
          if (page === 1) {
            pointsLogs = res.data.data.data;
          } else {
            pointsLogs = pointsLogs.concat(res.data.data.data);
          }

          This.setData({
            pointsLogs: pointsLogs
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
        // 隐藏加载框  
        wx.hideLoading();
      },
      error: function () {
        // 隐藏加载框  
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '提交失败'
        })
      }
    })
  },
  getMyPoints: function () {
    let This = this;
    wx.request({
      url: getApp().globalData.getProfileCentre.url,
      method: getApp().globalData.getProfileCentre.method,
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getApp().globalData._token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          console.log(res);
          This.setData({
            points: res.data.data.points,
            money: res.data.data.money
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
    let that = this;
    that.getMyPoints();
    that.getPointsLogs();
    that.getWithdrawLogs();
  
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
console.log(11);
    //给谁加页
    if (this.data.isShowCredit) {
      page.points += 1;
      this.getPointsLogs(page.points);
    }

    if (this.data.isShowWithdraw) {
      page.with += 1;
      this.getWithdrawLogs(page.withdraw);
    }

    this.setData({
      page: page
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})