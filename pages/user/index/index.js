// pages/user/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    statusData: [],
    bindMobile:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  btnClick(){
    wx.navigateTo({
      url: '/pages/other/authorize/authorize',
    })
  },
  bindMobile(){
    wx.navigateTo({
      url: '/pages/user/phonenumber/phonenumber',
    })
  },
  orderAll(){
    wx.navigateTo({
      url: '/pages/user/order/order',
    })
  },
  orderNoPay(){
    wx.navigateTo({
      url: '/pages/user/nopay/nopay',
    })
  },
  orderNoDelivery() {
    wx.navigateTo({
      url: '/pages/user/nodelivery/nodelivery',
    })
  },
  orderNoReceiving() {
    wx.navigateTo({
      url: '/pages/user/noreceiving/noreceiving',
    })
  },
  orderReturnBack(){
    wx.navigateTo({
      url: '/pages/user/returnback/returnback',
    })
  },
  coupon(){
    wx.navigateTo({
      url: '/pages/user/coupon/coupon',
    })
  },
  cart() {
    wx.switchTab({
      url: '/pages/cart/index/index',
    })
  },
  attention() {
    wx.navigateTo({
      url: '/pages/user/attention/attention',
    })
  },
  browsingHistory() {
    wx.navigateTo({
      url: '/pages/user/history/history',
    })
  },
  addressManager() {
    wx.navigateTo({
      url: '/pages/user/address/address',
    })
  },
  setUserInfo() {
    wx.navigateTo({
      url: '/pages/user/setinfo/setinfo',
    })
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
    let that = this
    let token = wx.getStorageSync('token')
    
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