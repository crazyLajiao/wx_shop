// pages/other/authorize/authorize.js
const app = getApp()

Page({
  data: {
    canIUse:wx.canIUse('button.open-type.getUserInfo')
  },
  
  bindGetUserInfo(e){
    if(e.detail.userInfo){
      let that = this
      if (app.globalData.isConnected) {
        wx.setStorageSync('userInfo', e.detail.userInfo)
        app.globalData.userInfo = e.detail.userInfo
        this.login()
      } else {
        wx.showToast({
          title: '当前无网络',
          icon: "none",
        })
      }
    }else{
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  login(){
    let that = this
    let token = wx.getStorageSync('token')
    let pageStack = getCurrentPages()
    let prePage = pageStack[pageStack.length-2].route
    
    if(token){
      wx.request({
        url:app.globalData.api_url+'/user/check',
        data:{
          token:token
        },
        success(res){
          if(res.data.code!=0){
            wx.removeStorageSync('token')
            that.login()
          }else{
            // if(prePage=="pages/enter/enter"){
              wx.switchTab({
                url: '/pages/index/index',
              })
            // }else if(prePage=="pages/user/index/index"){
              // wx.switchTab({
              //   url: '/pages/user/index/index',
              // })
            // } 
          }
        }
      })
      return
    }
    wx.login({
      success(res){
        let code = res.code
        wx.setStorageSync('code',code)
        wx.request({
          url:app.globalData.api_url+"/user/login",
          data:{
            code:res.code
          },
          success(res){
            if(res.data.code!=0){
              // 登录错误
              wx.hideLoading()
              wx.showModal({
                title: '提示',
                content: '无法登录，请重试',
                showCancel:false
              })
              return
            }
            wx.setStorageSync('token', res.data.data.token)
            wx.setStorageSync('uid', res.data.data.uid)
            // 回到原来的地方
            // if (prePage == "pages/enter/enter") {
              wx.switchTab({
                url: '/pages/index/index',
              })
            // } else if (prePage == "pages/user/index/index") {
              // wx.switchTab({
              //   url: '/pages/user/index/index',
              // })
            // } 
          }
        })
      }
    })
  },
  registerUser() {
    let that = this
    wx.login({
      success(res){
        let code = res.code
        wx.getUserInfo({
          success(res){
            let iv = res.iv
            let encryptedData = res.encryptedData
            // 调用注册接口
            wx.request({
              url:app.globalData.api_url+"user/reqister",
              data:{
                code,
                encryptedData,
                iv
              },
              success(res){
                wx.hideLoading()
                that.login()
              }
            })
          }
        })
      }
    })
  }
})