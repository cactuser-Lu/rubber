//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://s2.ax1x.com/2019/05/23/VCIILF.jpg'
    }, {
      id: 1,
      type: 'image', 
      url: '../../image/2.jpg',
    }, {
      id: 2,
      type: 'image',
        url: '../../image/3.jpg'
    }, {
      id: 3,
      type: 'image',
        url: '../../image/4.jpg'
    }, {
      id: 4,
      type: 'image',
        url: '../../image/5.jpg'
    }],
    grides: [
      {
        name:"计算机学院",
        url: "../../icon/jsj.png"
      },
      {
       name: "土建学院",
        url: "../../icon/jianzhu.png"
      },
      {
        name:"经济学院",
        url: "../../icon/jinji.png"
      },
      {
        name:"汽车工程学院",
        url: "../../icon/qiche.png"
      },
      {
        name:"艺术学院",
        url: "../../icon/yishu.png"
      },
      {
        name:"理学院",
        url: "../../icon/shuxue.png"
      },
      {
        name:"材料学院",
        url: "../../icon/cailiao.png"
      }],
    qita: {
      name: "空闲教室",
      url: "../../icon/jiaoshi.png"
    },
    jinrishici:"春眠不觉晓，处处闻啼鸟"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },

  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})
