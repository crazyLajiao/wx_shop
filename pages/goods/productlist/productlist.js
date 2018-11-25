// pages/goods/productlist/productlist.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isStock: 0,
    isPriceInc: 2,
    isDiscountInc: 2,
    itemList: [],  //获取到的所有源数据
    filterList: [], //最后用来保存处理后的数据提供给页面
    priceIncList: [], //价格升序的数据
    priceDecList: [],
    discountIncList: [],//折扣升序的数据
    discountDecList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.api_url + "/goods/product",
      success: (res) => {
        this.setData({
          itemList: res.data.products,
          filterList: res.data.products,
          priceIncList: res.data.products,
          priceDecList: res.data.products,
          discountIncList: res.data.products,
          discountDecList: res.data.products
        })
      }
    })
  },
  // 升序
  incSortBy(attr) {
    return function (a, b) {
      return a[attr] - b[attr]
    }
  },
  // 降序
  decSortBy(attr) {
    return function (a, b) {
      return b[attr] - a[attr]
    }
  },
  changeStock() {
    let that = this
    // 从显示所有商品切换到只显示有货的商品
    if (that.data.isStock == 0) {
      this.setData({
        isStock: 1,
      })
      // let tempList = JSON.parse(JSON.stringify(that.data.itemList))
      let tempList = []
      for (let i = 0; i < that.data.itemList.length; i++) {
        if (that.data.itemList[i].stock >0) {
          tempList.push(that.data.itemList[i])
        }
      }
      if (that.data.isPriceInc == 2) {
        if (that.data.isDiscountInc == 1) { //价格无要求 折扣升序
          tempList.sort(that.incSortBy("vipDiscount"))
        } else if (that.data.isDiscountInc == 0) { //价格无要求 折扣降序
          tempList.sort(that.decSortBy("vipDiscount"))
        }
      }else if (that.data.isPriceInc == 1) { 
        if (that.data.isDiscountInc == 2){
          tempList.sort(that.incSortBy("vipshopPrice")) //价格升序 折扣无要求
        }else if (that.data.isDiscountInc == 1) { //价格升序 折扣升序
          tempList.sort(that.incSortBy("vipshopPrice")).sort(that.incSortBy("vipDiscount"))
        } else if (that.data.isDiscountInc == 0) { //价格升序 折扣降序
          tempList.sort(that.incSortBy("vipshopPrice")).sort(that.decSortBy("vipDiscount"))
        }  
      } else if (that.data.isPriceInc == 0) { 
        if (that.data.isDiscountInc == 2) { //价格降序 折扣无要求
          tempList.sort(that.decSortBy("vipshopPrice")) 
        } else if (that.data.isDiscountInc == 1) { //价格降序序 折扣升序
          tempList.sort(that.decSortBy("vipshopPrice")).sort(that.incSortBy("vipDiscount"))
        } else if (that.data.isDiscountInc == 0) { //价格降序 折扣降序
          tempList.sort(that.decSortBy("vipshopPrice")).sort(that.decSortBy("vipDiscount"))
        }  
      } 
      // 最后处理完成的数据保存在filterList中
      that.setData({
        filterList: tempList
      })
      //从只显示有货的商品切换到显示所有商品
    } else if (that.data.isStock == 1) {
      this.setData({
        isStock: 0
      })
      let tempList = JSON.parse(JSON.stringify(that.data.itemList))
      if (that.data.isPriceInc == 2) {
        if (that.data.isDiscountInc == 1) { //价格无要求 折扣升序
          tempList.sort(that.incSortBy("vipDiscount"))
        } else if (that.data.isDiscountInc == 0) { //价格无要求 折扣降序
          tempList.sort(that.decSortBy("vipDiscount"))
        }
      } else if (that.data.isPriceInc == 1) {
        if (that.data.isDiscountInc == 2) {
          tempList.sort(that.incSortBy("vipshopPrice")) //价格升序 折扣无要求
        } else if (that.data.isDiscountInc == 1) { //价格升序 折扣升序
          tempList.sort(that.incSortBy("vipshopPrice")).sort(that.incSortBy("vipDiscount"))
        } else if (that.data.isDiscountInc == 0) { //价格升序 折扣降序
          tempList.sort(that.incSortBy("vipshopPrice")).sort(that.decSortBy("vipDiscount"))
        }
      } else if (that.data.isPriceInc == 0) {
        if (that.data.isDiscountInc == 2) { //价格降序 折扣无要求
          tempList.sort(that.decSortBy("vipshopPrice"))
        } else if (that.data.isDiscountInc == 1) { //价格降序序 折扣升序
          tempList.sort(that.decSortBy("vipshopPrice")).sort(that.incSortBy("vipDiscount"))
        } else if (that.data.isDiscountInc == 0) { //价格降序 折扣降序
          tempList.sort(that.decSortBy("vipshopPrice")).sort(that.decSortBy("vipDiscount"))
        }
      } 
     
      // 最后处理完成的数据保存在filterList中
      that.setData({
        filterList: tempList
      })
    }
  },
  changePrice() {
    let that = this
    if (that.data.isPriceInc == 2 || that.data.isPriceInc == 0) {
      this.setData({
        isPriceInc: 1
      })
      that.data.priceIncList.sort(that.incSortBy('vipshopPrice'))
      let tempList = JSON.parse(JSON.stringify(that.data.priceIncList))
      if (that.data.isStock == 1) {   //有货商品
        for (let i = 0; i < tempList.length; i++) {
          if (tempList[i].stock == -1) {
            tempList.splice(i, 1)
            i--
          }
        }
        if (that.data.isDiscountInc == 1) {
          tempList.sort(that.incSortBy('vipDiscount'))
        } else if (that.data.isDiscountInc == 0) {
          tempList.sort(that.decSortBy('vipDiscount'))
        }
      } else if (that.data.isStock == 0) {
        if (that.data.isDiscountInc == 1) {
          tempList.sort(that.incSortBy('vipDiscount'))
        } else if (that.data.isDiscountInc == 0) {
          tempList.sort(that.decSortBy('vipDiscount'))
        }
      }
      
      // 最后处理完成的数据保存在filterList中
      that.setData({
        filterList: tempList
      })
    } else if (that.data.isPriceInc == 1) {
      this.setData({
        isPriceInc: 0
      })
      that.data.priceDecList.sort(that.decSortBy('vipshopPrice'))
      let tempList = JSON.parse(JSON.stringify(that.data.priceDecList))
      if (that.data.isStock == 1) {   //有货商品
        for (let i = 0; i < tempList.length; i++) {
          if (tempList[i].stock == -1) {
            tempList.splice(i, 1)
            i--
          }
        }
        if (that.data.isDiscountInc == 1) {
          tempList.sort(that.incSortBy('vipDiscount'))
        } else if (that.data.isDiscountInc == 0) {
          tempList.sort(that.decSortBy('vipDiscount'))
        }
      } else if (that.data.isStock == 0) {
        if (that.data.isDiscountInc == 1) {
          tempList.sort(that.incSortBy('vipDiscount'))
        } else if (that.data.isDiscountInc == 0) {
          tempList.sort(that.decSortBy('vipDiscount'))
        }
      }
      
      // 最后处理完成的数据保存在filterList中
      that.setData({
        filterList: tempList
      })
    }
  },
  // 点击时使用数据
  changeDiscount() {
    let that = this
    if (that.data.isDiscountInc == 2 || that.data.isDiscountInc == 0) {
      this.setData({
        isDiscountInc: 1
      })
      that.data.discountIncList.sort(that.incSortBy('vipDiscount'))
      let tempList = JSON.parse(JSON.stringify(that.data.discountIncList))
      console.log(tempList)
      if (that.data.isStock == 1) {   //有货商品
        for (let i = 0; i < tempList.length; i++) {
          if (tempList[i].stock == -1) {
            tempList.splice(i, 1)
            i--
          }
        }
        if (that.data.isPriceInc == 1) {
          tempList.sort(that.incSortBy('vipshopPrice'))
        } else if (that.data.isPriceInc==0) {
          tempList.sort(that.decSortBy('vipshopPrice'))
        }
      } else if (that.data.isStock == 0) {
        if (that.data.isPriceInc == 1) {
          tempList.sort(that.incSortBy('vipshopPrice'))
        } else if (that.data.isPriceInc == 0) {
          tempList.sort(that.decSortBy('vipshopPrice'))
        }
        console.log(tempList)
      }
     
      // 最后处理完成的数据保存在filterList中
      that.setData({
        filterList: tempList
      })
    } else if (that.data.isDiscountInc == 1) {
      this.setData({
        isDiscountInc: 0
      })
      that.data.discountIncList.sort(that.decSortBy('vipDiscount'))
      let tempList = JSON.parse(JSON.stringify(that.data.discountIncList))
      if (that.data.isStock == 1) {   //有货商品
        for (let i = 0; i < tempList.length; i++) {
          if (tempList[i].stock == -1) {
            tempList.splice(i, 1)
            i--
          }
        }
        if (that.data.isPriceInc == 1) {
          tempList.sort(that.incSortBy('vipshopPrice'))
        } else if (that.data.isPriceInc == 0) {
          tempList.sort(that.decSortBy('vipshopPrice'))
        }
      } else if (that.data.isStock == 0) {
        if (that.data.isPriceInc == 1) {
          tempList.sort(that.incSortBy('vipshopPrice'))
        } else if (that.data.isPriceInc == 0) {
          tempList.sort(that.decSortBy('vipshopPrice'))
        }
      }
      
      // 最后处理完成的数据保存在filterList中
      that.setData({
        filterList: tempList
      })
    }
  }
})