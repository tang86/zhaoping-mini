// pages/position/position.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data_districts: {},
    district_selected_number: 0,
    position_selected_number: 0,
    page: 1,
    current_sub_districts: [],
    positions: [],
    conditions: {
      district: {
        img: '../../images/position/zw_xl.png',
        selected: '',
        isHideSub: true,
        items: {},

      },
      position: {
        img: '../../images/position/zw_xl.png',
        selected: '',
        isHideSub: true,
        items: [
          {
            id: 1,
            name: '医疗',
            slected: ''
          },
          {
            id: 2,
            name: '金融',
            slected: ''
          },
          {
            id: 3,
            name: '教育',
            slected: ''
          }
          ,
          {
            id: 4,
            name: '科技',
            slected: ''
          }
          ,
          {
            id: 5,
            name: '机械',
            slected: ''
          }

        ],
      },
      salary: {
        img: '../../images/position/zw_xl.png',
        selected: '',
        isHideSub: true,
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
        img: '../../images/position/zw_xl.png',
        selected: '',
        isHideSub: true,
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
      if (key === name && conditions[key].isHideSub) {
        // conditions[key].img = '../../images/position/ic_line_light.png';
        conditions[key].selected = 'selected';
        conditions[key].isHideSub = false;
      } else {
        // conditions[key].img = '../../images/position/ic_pulldown.png';
        conditions[key].selected = '';
        conditions[key].isHideSub = true;
      }

    }
    this.setData({
      conditions: conditions
    });

  },
  selectOption: function (option) {
    let that = this;
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

    this.getPositions(1, condition);

    setTimeout(function () {
      that.initConditions();
    }, 500)


  },
  selectFirstOption: function (option) {

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
    let data_districts = this.data.data_districts;
    this.setData({
      district_selected_number: 0,
      current_sub_districts: data_districts.cities[id],
      conditions: conditions
    });
  },
  resetSecondOption: function (option) {

    let current_sub_districts = this.data.current_sub_districts;
    for (let key in current_sub_districts) {
      current_sub_districts[key].selected = '';
    }
    this.setData({
      district_selected_number: 0,
      current_sub_districts: current_sub_districts,
    });
  },
  selectSecondOption: function (option) {
    let district_selected_number = this.data.district_selected_number;
    let condition = option.currentTarget.dataset.type;
    let id = option.currentTarget.dataset.id;
    let current_sub_districts = this.data.current_sub_districts;
    for (let key in current_sub_districts) {
      if (current_sub_districts[key].id === id && district_selected_number <= 3) {
        if (current_sub_districts[key].selected == 'sub-selected') {
          current_sub_districts[key].selected = '';
          district_selected_number--;
        } else {
          current_sub_districts[key].selected = 'sub-selected';
          district_selected_number++;

        }

      } else {
        //current_sub_districts[key].selected = '';
      }

    }

    let data_districts = this.data.data_districts;
    this.setData({
      district_selected_number: district_selected_number,
      current_sub_districts: current_sub_districts,
    });
  },
  selectPositionOption: function (option) {
    let position_selected_number = this.data.position_selected_number;
    let condition = option.currentTarget.dataset.type;
    let current_sub_positions = this.data.current_sub_positions;

    let id = option.currentTarget.dataset.id;
    let conditions = this.data.conditions;
    for (let key in conditions[condition].items) {
      if (conditions[condition].items[key].id === id && position_selected_number <= 2) {
        if (conditions[condition].items[key].selected == 'sub-selected') {
          conditions[condition].items[key].selected = '';
          position_selected_number--;
        } else {
          conditions[condition].items[key].selected = 'sub-selected';
          position_selected_number++;
        }

      } else if (conditions[condition].items[key].id === id && conditions[condition].items[key].selected == 'sub-selected') {
        conditions[condition].items[key].selected = '';
        position_selected_number--;
      } {
        //current_sub_districts[key].selected = '';
      }

    }

    this.setData({
      position_selected_number: position_selected_number,
      conditions: conditions,
    });
  },
  search: function (option) {
    let condition = option.currentTarget.dataset.type;
    let that = this;
    let conditions = this.data.conditions;
    for (let key in conditions) {
      conditions[key].isHideSub = true;
    }
    this.setData({
      conditions: conditions
    });
    this.getPositions(1, condition);
    setTimeout(function () {
      that.initConditions();
    }, 500)

  },
  getDistricts: function () {
    let that = this;
    wx.request({
      url: getApp().globalData.getDistricts.url,
      method: getApp().globalData.getDistricts.method,
      success: function (res) {
        let conditions = that.data.conditions;
        conditions.district.items = res.data.data.all
        conditions.district.items[0].selected = 'sub-selected';

        that.setData({
          data_districts: res.data.data,
          current_sub_districts: res.data.data.cities[1],
          conditions: conditions
        });
      }
    });
  },
  getPositions: function (page = 1, name = '') {
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })
    var This = this;
    let selectedConditions = This.getSelectedConditions(name);
    let data = {
      page: page,
      selectedConditions: selectedConditions
    };
    wx.request({
      url: getApp().globalData.getPositions.url,
      method: getApp().globalData.getPositions.method,
      data: data,
      success: function (res) {
        console.log(res.data.data.data);
        if (res.statusCode === 200) {
          let positions = This.data.positions;
          if (page === 1) {
            positions = res.data.data.data;
          } else {
            positions = positions.concat(res.data.data.data);
          }

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
    this.getConditions();
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

  },
  getConditions: function () {
    let that = this;
    wx.request({
      url: getApp().globalData.getConditions.url,
      method: getApp().globalData.getConditions.method,
      success: function (res) {
        console.log(res.data.data);
        let conditions = that.data.conditions;
        conditions.position.items = res.data.data.company_categories;
        conditions.salary.items = res.data.data.salaries;
        that.setData({
          conditions: conditions
        });
      }
    });
  },
  getSelectedConditions: function (name = '') {

    let districts = [];
    let positions = [];
    let salaries = [];
    let room = [];

    if (name == '' || name == 'district') {
      // 地区
      districts = this.getSelectedIds(this.data.current_sub_districts);
    }


    //职位
    if (name == '' || name == 'position') {
      positions = this.getSelectedIds(this.data.conditions.position.items);
    }
    //工资
    if (name == '' || name == 'salary') {
      salaries = this.getSelectedIds(this.data.conditions.salary.items);
    }
    //住宿
    if (name == '' || name == 'room') {
      room = this.getSelectedIds(this.data.conditions.room.items);
    }
    let selectedConditions = {
      district_id: districts,
      company_category_id: positions,
      salary_id: salaries,
      room_and_board: room,
    };

    return selectedConditions;
  },
  getSelectedIds: function (obj) {

    let ids = [];
    for (let key in obj) {

      if (obj[key].hasOwnProperty('selected')) {
        if ((obj[key].selected != '')) {
          ids.push(obj[key].id)
        }
      }
    }
    return ids;
  },
  initConditions: function () {
    let conditions = this.data.conditions;
    for (let key in conditions) {

      conditions[key].img = '../../images/position/ic_pulldown.png';
      conditions[key].selected = '';
      conditions[key].isHideSub = true;

    }
    this.setData({
      conditions: conditions
    });
  }
})