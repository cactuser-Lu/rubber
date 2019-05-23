// pages/index/cou_detail/cou_detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sid: null,
    CustomBar: app.globalData.CustomBar,
    colorList: [{
        color: "red"
      },
      {
        color: "orange"
      }, 
      {
        color: "green"
      },
      {
        color: "blue"
      }
    ], 
    courseData: null,
    flaglist: []
  }, 

  loadHandler: function() {
    var that = this;
    var courseData = this.data.courseData;
    //var flaglist=[],
    var flaglist=(this.data.flaglist)
    wx.request({
      url: 'https://www.cactuser.cn/rubber/Course/findCou',
      data: {
        sid: this.data.sid
      },
      success: function(res) {
        //console.log(res);
        that.setData({ 
          courseData: res.data
        })
        wx.setStorage({
          key: 'courseData' + that.data.sid,
          data: res.data,
          success: function() {
            console.log('缓存成功。。。');
          }
        })
        if (wx.getStorageSync('flaglist') === "" || wx.getStorageSync('flaglist') === null){
          flaglist = [];
          for (var i = 0; i < that.data.courseData.length; i++) {
            flaglist.push({
              iconflag: false
            })   
          } 
          that.setData({
            flaglist: flaglist
          })
        }else{
          var flaglist = wx.getStorageSync('flaglist')
          that.setData({
            flaglist: flaglist
          })
        }  
        
      }  
    })
  }, 
  collectHandler: function(e) {
    var flaglist = this.data.flaglist;
    var that = this;
    var index = e.currentTarget.dataset.index;
    var cid=this.data.courseData[index].cid;
    const openid = (wx.getStorageSync("user")).openid;
    console.log(e)
    if (this.data.flaglist[index].iconflag) {
      wx.showToast({
        title: '取消收藏成功~',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '收藏成功~',
        duration: 2000
      })
    }

    this.data.flaglist[index].iconflag = !this.data.flaglist[index].iconflag
    var flag = this.data.flaglist[index].iconflag
    that.setData({
      flaglist: flaglist
    })
    wx.setStorageSync('flaglist',flaglist);
    wx.request({
      url: 'https://www.cactuser.cn/rubber/Course/collectCou',
      data:({
        cid:cid,
        flag:flag,
        openid:openid
      }),success:function(res){

      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(data) {
    this.setData({
      sid: data.sid,
    });
    var that = this;
    var courseData = this.data.courseData;
    var key = 'courseData' + this.data.sid;
    wx.getStorage({
      key: key,
      success: function (res) {
        that.setData({
          courseData: res.data
        })
        //console.log(that.data.courseData);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //console.log(this.data.sid);
    // console.log(this.data.courseData);
    var that = this;
    var flaglist = this.data.flaglist
     
    console.log(that.data.courseData)
    this.loadHandler();  
      if (wx.getStorageSync('flaglist')) {
        console.log("----->")
        that.setData({
          flaglist: wx.getStorageSync('flaglist')
        })
      } 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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