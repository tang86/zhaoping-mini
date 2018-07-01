// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resume: {},
    genders: [
      "请选择",
      "男",
      "女",
    ],
    genderIndex: 0,
    ages: [
      18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
      51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
      61, 62, 63, 64, 65
    ],
    ageIndex: 4,

    statusNames: [
      "离职",
      "在职"
    ],
    statusIndex: getApp().globalData.resume.status,
    workedDate: "2018.7",

  },
  genderPickerSelected: function (option) {
    let This = this;
    let genderIndex = option.detail.value;
    This.setData({
      genderIndex: genderIndex
    });
    This.updateGender(This.data.genders[genderIndex]);

  },
  agePickerSelected: function (option) {
    let This = this;
    let ageIndex = option.detail.value;
    This.setData({
      ageIndex: ageIndex
    });

    This.updateAge(This.data.ages[ageIndex]);
  },
  statusPickerSelected: function (option) {
    let This = this;
    let statusIndex = option.detail.value;
    This.setData({
      statusIndex: statusIndex
    });

    This.updateStatus(statusIndex);
  },
  workedDatePickerSelected: function (option) {
    let This = this;
    let workedDate = option.detail.value;
    This.setData({
      workedDate: workedDate
    });

    This.updateWorkedDate(workedDate);
  },
  toName: function () {
    wx.navigateTo({
      url: '/pages/profile/name',
    })
  },
  toBindPhone: function () {
    wx.navigateTo({
      url: '/pages/profile/bindPhone',
    })
  },
  toExperience: function () {
    wx.navigateTo({
      url: '/pages/profile/experience',
    })
  },
  toPreview: function () {
    wx.navigateTo({
      url: '/pages/profile/preview',
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
    this.getAndSetResume();
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
  updateGender: function (gender) {
    var This = this;
    var data = {
      gender: gender
    };

    wx.request({
      url: getApp().globalData.postResume.url,
      method: getApp().globalData.postResume.method,
      data: data,
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getApp().globalData._token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          let resume = This.data.resume;
          resume.gender = gender;
          This.setData({
            resume: resume
          });
          //getApp().globalData.resume.gender = gender;


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
  updateAge: function (age) {
    var This = this;
    var data = {
      age: age
    };
    wx.request({
      url: getApp().globalData.postResume.url,
      method: getApp().globalData.postResume.method,
      data: data,
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getApp().globalData._token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          let resume = This.data.resume;
          resume.age = age;
          This.setData({
            resume: resume
          });
          getApp().globalData.resume.age = age;


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
  updateIntentionsName: function (intentionsName) {
    var This = this;
    var data = {
      intentionsName: intentionsName
    };
    wx.request({
      url: getApp().globalData.postResume.url,
      method: getApp().globalData.postResume.method,
      data: data,
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getApp().globalData._token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          let resume = This.data.resume;
          resume.intentionsName = intentionsName;
          This.setData({
            resume: resume
          });
          getApp().globalData.resume.intentionsName = intentionsName;


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
  updateStatus: function (status) {
    var This = this;
    var data = {
      status: status
    };
    wx.request({
      url: getApp().globalData.postResume.url,
      method: getApp().globalData.postResume.method,
      data: data,
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getApp().globalData._token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          let resume = This.data.resume;
          resume.status = status;
          console.log(resume);
          This.setData({
            resume: resume,
            statusIndex: status
          });
          console.log(getApp().globalData.resume);
          getApp().globalData.resume.status = status;


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
  updateWorkedDate: function (workedDate) {
    var This = this;
    var data = {
      workedDate: workedDate
    };
    wx.request({
      url: getApp().globalData.postResume.url,
      method: getApp().globalData.postResume.method,
      data: data,
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getApp().globalData._token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          let resume = This.data.resume;
          resume.worked_date = workedDate;
          This.setData({
            resume: resume
          });
          getApp().globalData.resume.worked_date = workedDate;
console.log(resume);

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
  getAndSetResume: function () {
    var This = this;
    var data = {};
    wx.request({
      url: getApp().globalData.getResume.url,
      method: getApp().globalData.getResume.method,
      data: data,
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getApp().globalData._token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          This.setData({
            resume: res.data.data
          });
          console.log(res.data.data);
          getApp().globalData.resume = res.data.data;


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
  }
})