// pages/enter/enter.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind:'加载中。。',
    angle:0,
    userInfo:{}
  },
  goToIndex(){
    if(app.globalData.isConnected){
      wx.switchTab({
        url:"/pages/index/index"
      })
    }else{
      wx.showToast({
        title: '当前无网络',
        icon:"none"
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
    let that = this
    // 显示加载效果
    setTimeout(function(){
      that.setData({
        remind:''
      })
    },1000)
    wx.onAccelerometerChange(function(res){
      let angle = -(res.x*30).toFixed(1)
      if(angle>14){
        angle = 14
      }else if(angle<-14){
        angle = -14
      }
      if(that.data.angle!==angle){
        that.setData({
          angle
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if(!userInfo){
      wx.navigateTo({
        url:"/pages/other/authorize/authorize"
      })
    }else{
      that.setData({
        userInfo
      })
    }
  }
})