// pages/enter/enter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.login({
    //   success: res => {
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: 'https://wechatmp.foxitreader.cn/api/miniProgramLogin',
    //         data: {
    //           code: res.code,
    //           appid: "wx0a7fd36f3100917d"
    //         },
    //         header: {
    //           'content-type': 'application/x-www-form-urlencoded'
    //         },
    //         success: function (data) {
    //           var token = data.data.data.token;
    //           app.globalData.token = token;
    //           //用户信息验证
    //           wx.request({
    //             url: 'https://wechatmp.foxitreader.cn/api/miniProgramCheckLogin',
    //             data: {
    //               encryptedData: encryptedData,
    //               iv: iv,
    //               rawData: rawData,
    //               signature: signature,
    //               token: token
    //             },
    //             header: {
    //               'content-type': 'application/x-www-form-urlencoded'
    //             },
    //             success: function (data) {
    //               if (data.data.ret === 0) {
    //                 //用户信息验证成功
    //                 app.globalData.isVerification = true
    //               }

    //             }
    //           })
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }

    //   }
    // })
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
  dd:function(){

  },
  tapName:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res1) {
        wx.getImageInfo({
          src: res1.tempFilePaths[0],
          success: function (res) { 
            var lis = res.path + "$$$" + res.width + "$$$" + res.height
            wx.navigateTo({
              title:"回来",
              url: '/pages/index/index?Img_url=' + lis,
              success: function (res) {

              }
            })
          }
        })
      }
    });
   
    
 








  }
})