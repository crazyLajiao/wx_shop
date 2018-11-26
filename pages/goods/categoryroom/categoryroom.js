// pages/goods/categoryroom/categoryroom.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedId:'2000',
    midTitleImg1:'',
    midTitleImg2:'',
    midList:[],
    listTitle:[],
    knitList:[],
    flowerList:[],
    hoodieList:[],
    brandList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url:app.globalData.api_url+'/goods/categoryroom',
      success:(res)=>{
        let result = res.data.data[1]
        that.setData({
          midTitleImg1:res.data.data[0].img_url,
          midTitleImg2:res.data.data[1].img_url,
          midList:res.data.data[0].content,
          listTitle:result.topItem,
          knitList:result.topItem[0].list,
          flowerList:result.topItem[1].list,
          hoodieList:result.topItem[2].list,
          brandList:result.topItem[3].list
        })
      }
    })
  },
  goDetail(){
    wx.navigateTo({
      url: '/pages/goods/productdetail/productdetail',
    })
  },
  goProductList(){
    wx.navigateTo({
      url: '/pages/goods/productlist/productlist',
    })
  },
  onShow(){
    
  },
  changeNav(e){
    this.setData({
      selectedId:e.currentTarget.id
    })
  },
  swiperChange(e){
    console.log(e.detail)
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