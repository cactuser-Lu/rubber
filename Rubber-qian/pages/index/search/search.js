// pages/index/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    colorList:[{
      color:"red"
    },
    {
      color:"orange"
    },
    {
      color: "green"
    },
     {
        color: "blue"
      }],
    courseData: null
  },
  //搜索课程处理函数
  searchCouHandler:function(input){
      var value=input.detail.value;
      var courseData=this.data.courseData;
      var that=this;
      if(value){
      wx.request({
        url: 'https://www.cactuser.cn/rubber/Course/searchCou',
        data:{cname:value},
        success:function(res){
          that.setData({
            courseData:res.data
          })

        }
      })
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    console.log(app.globalData.CustomBar)
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