// pages/profile/experience.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyCategories: ['金融', '医疗', '教育'],
    companyCategoryIndex: 0,
    startedDate: "请选择",
    endedDate: "至今",
  },
  companyCategoryPickerSelected: function (option) {
    let This = this;
    let companyCategoryIndex = option.detail.value;
    This.setData({
      companyCategoryIndex: companyCategoryIndex
    });
  },
  startedDatePickerSelected: function (option) {
    let This = this;
    let startedDate = option.detail.value;
    This.setData({
      startedDate: startedDate
    });
  },
  endedDatePickerSelected: function (option) {
    let This = this;
    let endedDate = option.detail.value;
    This.setData({
      endedDate: endedDate
    });
  },
  onSubmit: function (e) {
    if (e.detail.value.company_name == '') {
      wx.showModal({
        title: '提示',
        content: '请填写企业名称'
      })
      return false;
    } else if (e.detail.value.startedDate == '请选择') {
      wx.showModal({
        title: '提示',
        content: '请选择工作开始时间'
      })
      return false;
    } else if (e.detail.value.description == '') {
      wx.showModal({
        title: '提示',
        content: '请选择工作开始时间'
      })
      return false;
    }

    var This = this;
    var data = e.detail.value;
    wx.request({
      url: getApp().globalData.addExperience.url,
      method: getApp().globalData.addExperience.method,
      data: data,
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getApp().globalData._token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          
          wx.navigateBack()
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
    this.getCompanyCategories();
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

  },
  getCompanyCategories: function () {
    let that = this;
    wx.request({
      url: getApp().globalData.getCompanyCategories.url,
      method: getApp().globalData.getCompanyCategories.method,
      success: function (res) {
        let companyCategories = that.data.companyCategories;
console.log(res.data.data);
        that.setData({
          companyCategories: res.data.data
        });
      }
    });
  }
})