// components/toast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '内容'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toastShow: function (str) {
      var _this = this;
      _this.setData({
        isShow: true,
        txt: str,

      });
      setTimeout(function () {    //toast消失
        _this.setData({
          isShow: false
        });
      }, 2000);
    },
  }
})
