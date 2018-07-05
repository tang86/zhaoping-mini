// pages/position/position.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    positions: [],
    conditions: {
      district: {
        img: '../../images/position/ic_pulldown.png',
        selected: '',
        isShowSub: true,
        items: {},

      },
      position: {
        img: '../../images/position/ic_pulldown.png',
        selected: '',
        isShowSub: true,
        items: {},
      },
      salary: {
        img: '../../images/position/ic_pulldown.png',
        selected: '',
        isShowSub: true,
        items: [{
          id: 1,
          name: '1K~3K',
          selected: '',
        },
        {
          id: 2,
          name: '3K~5K',
          selected: '',
        },
        {
          id: 3,
          name: '5K~10K',
          selected: '',
        },
        ],
      },
      room: {
        img: '../../images/position/ic_pulldown.png',
        selected: '',
        isShowSub: true,
        items: [{
          id: 1,
          name: '包吃住',
          selected: '',
        },
        {
          id: 2,
          name: '包吃',
          selected: '',
        },
        {
          id: 3,
          name: '包住',
          selected: '',
        },
        ],
      },
    }

  },
  selectedDistrict: function () {
    this.setSelected('district');
  },
  selectedPosition: function () {
    this.setSelected('position');
  },
  selectedSalary: function () {
    this.setSelected('salary');
  },
  selectedRoom: function () {
    this.setSelected('room');
  },
  setSelected: function (name) {
    let conditions = this.data.conditions;
    for (let key in conditions) {
      if (key === name) {
        conditions[key].img = '../../images/position/ic_line_light.png';
        conditions[key].selected = 'selected';
        conditions[key].isShowSub = false;
      } else {
        conditions[key].img = '../../images/position/ic_pulldown.png';
        conditions[key].selected = '';
        conditions[key].isShowSub = true;
      }

    }
    this.setData({
      conditions: conditions
    });

  },
  selectOption: function (option) {
    let condition = option.currentTarget.dataset.type;
    let id = option.currentTarget.dataset.id;
    let conditions = this.data.conditions;
    for (let key in conditions[condition].items) {
      if (conditions[condition].items[key].id === id) {
        conditions[condition].items[key].selected = 'sub-selected';
      } else {
        conditions[condition].items[key].selected = '';
      }

    }
    this.setData({
      conditions: conditions
    });
  },
  selectFirstOption: function (option) {
    
  },
  getDistricts: function () {
    wx.request({
      url: getApp().globalData.getDistricts.url,
      method: getApp().globalData.getDistricts.method,
      success: function (res) {
        console.log(res);
      }
    });
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
this.getDistricts();
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

  }
})