//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bgurl:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1016027930,2686813904&fm=11&gp=0.jpg'  
  },
  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },
    
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    var that=this;
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    }),
      app.globalData.userInfo = e.detail.userInfo
      //登录      
    wx.login({  
      success: res => {  
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)  
        if (res.code) {    
          console.log(res.code)        
          wx.request({
            url: 'https://www.cactuser.cn/rubber/Mydetail/userLogin',
            data: { code: res.code, userInfo: that.data.userInfo},
            success: function (res) {
              console.log("success")
              console.log(res)
              var obj = {};      
              obj.openid = res.data;
              wx.setStorageSync('user', obj); //存储openid
            },    
 
            fail: function () {

              console.log("fail")

            }
          })
        }
      }
    })
  }
  
})  
