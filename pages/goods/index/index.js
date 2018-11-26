// pages/goods/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedId:'冬季必买',
    goodsList:[],
    toView: '',
    scrollTop:300,
    order:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url:app.globalData.api_url+"/goods/classify",
      success:(res)=>{
        if(res.data){
          for(let i=0;i<res.data.data.length;i++){
            that.data.order.push(res.data.data[i]['name'])
          }
          this.setData({
            goodsList:res.data.data
          })
        }
      }
    })
  },
  searchNav() {
    wx.navigateTo({
      url: '/pages/other/search/search',
    })
  },
  goToProductList(){
    wx.navigateTo({
      url: '/pages/goods/productlist/productlist',
    })
  },
  scroll(e){
    if(e.detail.scrollTop>2850){
      this.setData({
        selectedId:this.data.order[7]
      })
    } else if (e.detail.scrollTop > 2600) {
      this.setData({
        selectedId: this.data.order[6]
      })
    } else if (e.detail.scrollTop > 2150) {
      this.setData({
        selectedId: this.data.order[5]
      })
    } else if (e.detail.scrollTop > 1800) {
      this.setData({
        selectedId: this.data.order[4]
      })
    } else if (e.detail.scrollTop > 1300) {
      this.setData({
        selectedId: this.data.order[3]
      })
    } else if (e.detail.scrollTop > 950) {
      this.setData({
        selectedId: this.data.order[2]
      })
    } else if (e.detail.scrollTop > 320) {
      this.setData({
        selectedId: this.data.order[1]
      })
    }else{
      this.setData({
        selectedId: this.data.order[0]
      })
    }
  },
  changeTitle(e) {
    this.setData({
      selectedId: e.currentTarget.id
    })
    for (let i = 0; i < this.data.order.length; i++) {
      if (this.data.order[i] == e.currentTarget.id) {
        this.setData({
          toView: this.data.order[i],
          scrollTop: 0+(i>0?340:0)+(i==2?650:0)+(i==3?961:0)+(i==4?1461:0)+(i==5?1812:0)+(i==6?2261:0)+(i==7?2461:0)
        })
      }
    }
  },
 
})