// pages/position/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guid: null,
    isSent: false,
    hasResume: false,
  },

  toCompany: function (option) {
    let company_id = option.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/company/company?company_id=' + company_id,
    })
  },
  sendResume: function (option) {
    let This = this;
    //先检查有无简历
    if (!This.data.hasResume) {
      wx.showModal({
        title: "",
        content: "您还没有简历无法投递\r\n是否现在创建？",
        showCancel: false,
        confirmText: '创建简历',
        success: function(e) {
          wx.navigateTo({
            url: '/pages/profile/profile',
          })
        }
      });
      return false;
    }
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
          
          This.setData({
            isSent: true
          });
          wx.showModal({
            title: "",
            content: "简历投递成功，企业会通过电话\r\n尽快与您沟通",
            showCancel: false,
            confirmText: '好的',
            success: function (e) {
              
            }
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
    This.hasResume();
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
        res.data.data.benefit = getApp().convertHtmlToText(res.data.data.benefit);
        This.setData(res.data.data);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.toast = this.selectComponent("#toast");
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
  onShareAppMessage: function (ops) {
    let that = this;
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '区域聘小程序',
      path: '/pages/position/show',
      imageUrl: '/images/position_share.png',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
        //加积分
        that.increasePointsShare();

      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  },
  hasResume: function () {
    let This = this;
    wx.request({
      url: getApp().globalData.hasResume.url,
      method: getApp().globalData.hasResume.method,
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getApp().globalData._token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          let hasResume = This.data.hasResume;
          if (res.data.data.status == 0) {
            hasResume = false;
          } else {
            hasResume = true;
          }
          This.setData({
            hasResume: hasResume
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
  increasePointsShare: function () {
    console.log('我去加积分');
    let that = this;
    let data = {
      code: 'share_position_id_' + this.data.guid
    };
    wx.request({
      url: getApp().globalData.increasePointsShare.url,
      method: getApp().globalData.increasePointsShare.method,
      data: data,
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getApp().globalData._token
      },
      success(res) {

        if (res.data.data.status == 1) {

          that.toast.toastShow('分享职位成功+1积分');
        } else {
          console.log('加积分失败了');
        }


      }
    });
  },
})