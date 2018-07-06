// pages/credit/credit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeCredit: 'active',
    isShowCredit: true,
    activeWithdraw: '',
    isShowWithdraw: false,
    cardSelected: 100,
    cards: {
      first: {
        img:'../../images/wode/ic_choice_light.png',
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
  toastShow: function (str, icon) {
    var _this = this;
    _this.setData({
      isShow: true,
      txt: str,
      iconClass: icon
    });
    setTimeout(function () {    //toast消失
      _this.setData({
        isShow: false
      });
    }, 3000);
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.toastShow("登录名不能为空\r\n阅读文章+1积分", "icon-suo");
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