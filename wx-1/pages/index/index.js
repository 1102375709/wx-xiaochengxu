// pages/index/index.js
const calc = require('./calc.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
	  result: '0',
    num1: '0',
	  num2: '0',
    op: '',
	  isClear: false
  },

  // 数字按钮事件处理函数
  numBtn: function(e) {
    var num = e.target.dataset.val
    if(this.data.op === ''){
      if(this.data.num1 === '0' || this.isClear){
        this.setData({
          num1: num,
          result: this.data.num1,
        })
        this.isClear = false
      }else{
        this.setData({
          num1: this.data.num1 + num,
          result: this.data.num1
        })
      }
    }else{
      if(this.data.num2 === '0' || this.isClear){
        this.setData({
          num2: num,
          result: this.data.num2
        })
        this.isClear = false
      }else{
        this.setData({
          num2: this.data.num2 + num,
          result: this.data.num2
        })
      }
    }
  },

  // 四则运算符事件处理函数
  opBtn: function(e) {
    var op1 = e.target.dataset.val
    if(this.data.op ===''){
      this.setData({
        op: op1
      })
    }else{
      console.log('op输入错误')
    }
  },

  // 等于运算符事件处理函数
  equalBtn: function(e) {
    var num1 = Number(this.data.num1)
    var num2 = Number(this.data.num2)
    console.log(num1)
    console.log(num2)
    console.log(this.data.op);
    if (this.data.op === '+') {
      this.data.result = calc.add(num1, num2)
    } else if (this.data.op === '-') {
      this.data.result = calc.sub(num1, num2)
    } else if (this.data.op === '*') {
      this.data.result = calc.mul(num1, num2)
    } else if (this.data.op === '/') {
      this.data.result = calc.div(num1, num2)
    } else if (this.data.op === '%') {
      this.data.result = num1 % num2
    }
    this.setData({
      result: this.data.result + ''
    })
    console.log(this.data.result)
  },
  // 小数点事件处理函数
  dotBtn: function() {
    if(this.data.num1){
      if (this.data.isClear) {
        this.setData({
          num1: '0.'
        })
        this.data.isClear = false
        return
      }
      if (this.data.num1.indexOf('.') >= 0) {
        return
      }
      this.setData({
        num1: this.data.num1 + '.'
      })
    }
    if(this.data.num2){
      if (this.data.isClear) {
        this.setData({
          num2: '0.'
        })
        this.data.isClear = false
        return
      }
      if (this.data.num2.indexOf('.') >= 0) {
        return
      }
      this.setData({
        num2: this.data.num2 + '.'
      })
    }
  },

  // DEL按钮处理函数
  delBtn: function() {
    if(this.data.num1){
      var num = this.data.num1.substr(0, this.data.num1.length - 1)
      this.setData({
        result: num === '' ? '0' : num,
        num1: num === '' ? '0' : num,
      })
    }
    if(this.data.num2){
      var num = this.data.num2.substr(0, this.data.num2.length - 1)
      this.setData({
        result: num === '' ? '0' : num,
        num2: num === '' ? '0' : num,
      })
    }
  },

  // C按钮事件处理函数
  resetBtn: function() {
    this.setData({
      result: '0',
      isClear: false,
      num1: '0',
      num2: '0',
      op: ''
    })
  }
})