// index.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()
Page({
    data:{
        navData: ["首页", "补贴爆品", "电脑办公", "手机", "数码", "女鞋", "宠物", "爱车","箱包皮具","腕表珠宝","大家电","女装","拍拍二手","奢侈品","图书","童装","玩具乐器","美妆","个护清洁","母婴","运动","食品饮料"],
        currentTab: 0,
        navScrollLeft: 0,
        indicatordots: true,
        autoplay: true,
        interval: 3000,
        endTime: "2022-03-30 10:00:00",
    },
    search:function(){
    },
    onLoad(){
        wx.getSystemInfo({
          success: (res) => {
              this.setData({
                  pixelRatio: res.pixelRatio,
                  windowHeight: res.windowHeight,
                  windowWidth: res.windowWidth
              })
          },
        })
    },
    switchNav (event) {
        var cur = event.currentTarget.dataset.current;
        var singleNavWidth = this.data.windowWidth / 5;  //每个tab选项宽度占1/5
        this.setData({
            navScrollLeft: (cur - 2) * singleNavWidth    //tab选项居中
        })
        if(this.data.currentTab == cur){
            return false;
        }else{
            this.setData({
                currentTab: cur
            })
        }
    },
    //倒计时
    timeFormat(param){
        return param < 10 ? '0' + param : param;
    },
    singleCountDown:function(){
        var that = this;
        var time = 0;
        var obj = {};
        var endTime = new Date(that.data.endTime.replace(/-/g, "/")).getTime();     //结束时间时间戳
        var currentTime = new Date().getTime();     //当前时间时间戳
        time = (endTime - currentTime) / 1000;
        if (time > 0) {     //如果活动未结束
            var hou = parseInt(time / (60 * 60));
            var min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
            var sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
            obj = {
                hou: that.timeFormat(hou),
                min: that.timeFormat(min),
                sec: that.timeFormat(sec)
            }
        }else{      //活动已结束
            obj = {
                hou: "00",
                min: "00",
                sec: "00"
            }
            clearTimeout(that.data.timeIntervalSingle);     //清除定时器
        }
        var timeIntervalSingle = setTimeout(that.singleCountDown, 1000);
        that.setData({
            timeIntervalSingle,
            txtTime: obj,
        })
    },
    onLoad:function(options){       //生命周期函数--监听页面加载
        this.singleCountDown();     //页面加载时就启动定时器
    },
})
