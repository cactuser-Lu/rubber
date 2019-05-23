// pages/dongtai/dongtai.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfo: {},
    dongtai: [{
        touxiang: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        name: "王思聪",
        date: "2018/04/20",
        content: " 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！",
        bot1: "20",
        bot2: "30",
        bot3: "算法设计与分析"
      },
      {
        touxiang: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3630558657,2653393812&fm=58&bpow=1516&bpoh=1920",
        name: "特朗普",
        date: "2019/02/16",
        content: "“我们应该竭尽全力阻止枪支暴力，而不是鼓励枪支出口。特朗普拒绝联合国《武器贸易条约》只会让全世界的恐怖分子和其他危险分子更加猖狂，(特朗普的决定)是一种危险、鲁莽的举动，将危及全世界无数美国人和其他无辜的人。”",
        bot1: "200",
        bot2: "310",
        bot3: "材料力学"
      },
      {
        touxiang: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        name: "王思聪",
        date: "2018/04/20",
        content: "折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！",
        bot1: "20",
        bot2: "30",
        bot3: "桥梁力学"
      },
      {
        touxiang: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        name: "王思聪",
        date: "2018/04/20",
        content: " 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！",
        bot1: "20",
        bot2: "30",
        bot3: "土木工程概论"
      },

    ],
    donInfo: null,
    flaglistDon: []
  },
  zanHandler: function(e) {
    var donInfo=this.data.donInfo
    var flaglistDon = this.data.flaglistDon;
    var that = this;
    var index = e.currentTarget.dataset.index;
    if (this.data.flaglistDon[index].zanflag) {
      wx.showToast({
        title: '已经点过赞了~',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '点赞成功~',
        duration: 2000
      })
      that.data.donInfo[index].zan = that.data.donInfo[index].zan+1
      var did = that.data.donInfo[index].did;
      wx.request({
        url: 'https://www.cactuser.cn/rubber/Dongtai/zanCom',
        data: ({
          did:did
        }),
        success: function(res) {
          that.setData({
            donInfo:donInfo
          })
        }
      })  
    }
    this.data.flaglistDon[index].zanflag = true
    this.setData({
      flaglistDon: flaglistDon
    })
    wx.setStorageSync('flaglistDon', flaglistDon)
  
  },
  liuyanHandler: function () {
    wx.showModal({
      title: '提示',
      content: '功能正在开发~',
      success(res) {
          
      }
    })
  },
  loadHandler: function() {
    var that = this;
    var donInfo = this.data.donInfo;
    var flaglistDon = this.data.flaglistDon
    if (!wx.getStorageSync('user')) {
      wx.showToast({
        title: '请先授权登录',
        duration: 2000
      })
    }
    this.setData({
      userInfo: app.globalData.userInfo
    })
    wx.request({
      url: 'https://www.cactuser.cn/rubber/Dongtai/displayCom',
      data: {},
      success: function(res) {
        that.setData({
          donInfo: res.data.reverse()

        })
        if (wx.getStorageSync('flaglistDon')) {
          that.setData({
            flaglistDon: wx.getStorageSync('flaglistDon')
          })
        } else {
          
          for (var i = 0; i < that.data.donInfo.length; i++) {
            flaglistDon.push({
              zanflag: false
            })
          }
          that.setData({
            flaglistDon: flaglistDon
          })
        }

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var that = this
    console.log(app)
    this.setData({
      userInfo: app.globalData.userInfo
    })

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.loadHandler();
    var that = this
    var flaglistDon = this.data.flaglistDon

  },

  /** 
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})