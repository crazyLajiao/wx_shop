App({
  globalData: {
    userInfo: null,
    api_url: "https://www.easy-mock.com/mock/5bf49fcea1125d42ab27cf25/apimock",
    shareProfile: "小牛衣柜，你的衣柜",
    isConnected: true
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    let that = this
    
    // 初次加载判断网络情况 无网络状态下根据实际情况进行调整
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if(networkType==="none"){
          that.globalData.isConnected = false
          wx.showToast({
            title: '当前无网络',
            icon:"loading",
            duration:2000
          })
        }
      }
    })
    // 监听网络状态变化 可根据业务需求进行调整
    wx.onNetworkStatusChange(function(res){
      if(!res.isConnected){
        that.globalData.isConnected = false
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000,
          complete: function () {
            that.goEnterPage()
          }
        })
      }else{
        that.globalData.isConnected = true
        wx.hideToast()
      }
    })  
    // 判断是否授权登录
    let token = wx.getStorageSync("token")
    if(!token){
      that.goLoginPage()
      return
    }
    wx.request({
      url:that.globalData.api_url+"user/check",
      success(res){
        if(res.data.code!=0){
          wx.removeStorageSync("token")
          that.goLoginPage()
        }
      }
    })
  },
  goLoginPage: function () {
    setTimeout(function () {
      wx.navigateTo({
        url: "/pages/other/authorize/authorize"
      })
    }, 1000)
  },
  goEnterPage: function () {
    setTimeout(function () {
      wx.redirectTo({
        url: "/pages/enter/enter"
      })
    }, 1000)
  },
  
})
