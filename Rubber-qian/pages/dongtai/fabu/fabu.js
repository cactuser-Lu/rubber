// pages/dongtai/fabu/fabu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cname:null,
    content:null,
    info:null
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
    wx.switchTab({
      url: '../../dongtai/dongtai'
    })
  },
cnameHandler:function(res){
  var value = res.detail.value;
  var cname=this.data.cname;
  var that=this;
  if(value){
    that.setData({
      cname:value
    })
  }
},
contentHandler:function(res){
  var value = res.detail.value;
  var that=this;
  var content=this.data.content;
  if(value){
    that.setData({
      content:value
    })
  }
},
fabuHandler:function(e){
  var that=this;
  console.log(this)
  var cname=this.data.cname;
  var content=this.data.content;
  var info=this.data.info;
  const openid = (wx.getStorageSync("user")).openid;
  console.log(cname)
  console.log(content)
  if(!openid){
    that.setData({
      modalName: e.currentTarget.dataset.target,
      info: "请先授权登录！"
    })
  }else if(cname==null||content==null){
    that.setData({
      modalName: e.currentTarget.dataset.target,
      info: "发布失败，所填内容不能为空~"
    })
  } else if (cname!=null || content != null){
    wx.request({
      url: 'https://www.cactuser.cn/rubber/Dongtai/fabuCom',
      data: {
        cname: cname,
        content: content,
        openid: openid
      }, success: function (res) {
        that.setData({
          modalName: e.currentTarget.dataset.target,
          info: res.data.errorMsg
        })
        console.log(res)
        if(wx.getStorageSync('flaglistDon')){
          var flaglistDon = wx.getStorageSync('flaglistDon')
          flaglistDon.unshift({
            zanflag: false
          })
          wx.setStorageSync('flaglistDon', flaglistDon)
        } 
        
      }
    })
  }
 
},    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (!wx.getStorageSync('user')) {
      wx.showToast({
        title: '请先授权登录',
        duration: 2000
      })
    }
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