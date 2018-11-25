// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputvalue:'',
    activeId: 325834,
    navbarItems:[],
    brandItems:[],
    banners:[],
    curPage:0,
    autoplay:true,
    duration:1000,
    interval:3000,
    indicatorDots: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url:app.globalData.api_url+"/goods/classify",
      success(res){
        that.setData({
          navbarItems:res.data.data,
          banners:res.data.banner
        })
      },
      fail(){
        wx.showToast({
          title: '获取数据失败',
          icon:"success",
          duration:2000
        })
      }
    })
    wx.request({
      url:app.globalData.api_url+"/goods/brandshow",
      success(res){
        if(res.data.status==="success"){
          that.setData({
            brandItems:res.data.data[0]
          })
        }
      }
    })
  },
  searchNav(){
    wx.navigateTo({
      url: '/pages/other/search/search',
    })
  },
  tabClick(e){
    this.setData({
      activeId:e.target.id
    })
  },
  moreClass(){
    wx.switchTab({
      url: '/pages/goods/index/index',
    })
  },
  goCategoryRoom(){
    wx.navigateTo({
      url: '/pages/goods/categoryroom/categoryroom',
    })
  },
  getBrandList(th,isAppend){
    let that = th
    if(isAppend){
      wx.request({
        url:app.globalData.api_url+"/goods/brandshow",
        success:(res)=>{
          if(res.data.status==="success"){
            let temArr = res.data.data[0]
            // this.brandItems.concat(temArr)
            console.log(that.brandItems)
            console.log(temArr)
            this.setData({
              brandItems: that.brandItems.concat(temArr)
            })
          }
        }
      })
      
    }else{
      wx.request({
        url: app.globalData.api_url + "/goods/brandshow",
        success:(res)=>{
          if (res.data.status === "success") {
            // console.log(res.data.data[0])
            console.log(that.brandItems)
            this.setData({
              brandItems: res.data.data[0]
            })
          }
        }
      })
    }
    
  },
  goProductList(){
    wx.navigateTo({
      url: '/pages/goods/productlist/productlist',
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // this.getBrandList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // this.setData({
    //   curPage:this.curPage+1
    // })
    // this.getBrandList(this,true)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})