//index.js
//获取应用实例
var app = getApp();
var dataUrl = 'http://www.gnerv.com:8080/gnerv/music/2.mp3'
Page({
  data: {
    animationData: {},
    cardInfoList: [{
        cardUrl: "../../static/image/1 (1).jpg",
        cardInfo: {
          cardTitle: 'TO亲爱的闺蜜！！！',
          cardInfoMes: ['亲爱的闺蜜，你永远也看不到我寂寞时候的样子，因为只有你不在我身边的时候，我才会寂寞！']
        }
      }, {
        cardUrl: "../../static/image/1 (2).jpg",
        cardInfo: {
          cardTitle: 'TO亲爱的闺蜜！！！',
          cardInfoMes: ['亲爱的闺蜜，你永远也看不到我寂寞时候的样子，因为只有你不在我身边的时候，我才会寂寞！']
        }
      }, {
        cardUrl: "../../static/image/1 (3).jpg",
        cardInfo: {
          cardTitle: 'TO亲爱的闺蜜！！！',
          cardInfoMes: ['亲爱的闺蜜，你永远也看不到我寂寞时候的样子，因为只有你不在我身边的时候，我才会寂寞！']
        }
      }, {
        cardUrl: "../../static/image/1 (4).jpg",
        cardInfo: {
          cardTitle: 'TO亲爱的闺蜜！！！',
          cardInfoMes: ['亲爱的闺蜜，你永远也看不到我寂寞时候的样子，因为只有你不在我身边的时候，我才会寂寞！']
        }
      }, {
        cardUrl: "../../static/image/1 (5).jpg",
        cardInfo: {
          cardTitle: 'TO亲爱的闺蜜！！！',
          cardInfoMes: ['亲爱的闺蜜，你永远也看不到我寂寞时候的样子，因为只有你不在我身边的时候，我才会寂寞！']
        }
      }, {
        cardUrl: "../../static/image/1 (6).jpg",
        cardInfo: {
          cardTitle: 'TO亲爱的闺蜜！！！',
          cardInfoMes: ['亲爱的闺蜜，你永远也看不到我寂寞时候的样子，因为只有你不在我身边的时候，我才会寂寞！']
        }
      }, {
        cardUrl: "../../static/image/1 (7).jpg",
        cardInfo: {
          cardTitle: 'TO亲爱的闺蜜！！！',
          cardInfoMes: ['亲爱的闺蜜，你永远也看不到我寂寞时候的样子，因为只有你不在我身边的时候，我才会寂寞！']
        }
      }, {
        cardUrl: "../../static/image/1 (8).jpg",
        cardInfo: {
          cardTitle: 'TO亲爱的闺蜜！！！',
          cardInfoMes: ['亲爱的闺蜜，你永远也看不到我寂寞时候的样子，因为只有你不在我身边的时候，我才会寂寞！']
        }
      }, {
        cardUrl: "../../static/image/1 (9).jpg",
        cardInfo: {
          cardTitle: 'TO亲爱的闺蜜！！！',
          cardInfoMes: ['亲爱的闺蜜，你永远也看不到我寂寞时候的样子，因为只有你不在我身边的时候，我才会寂寞！']
      }
    }],

    current: {
      poster: '../../static/image/1 (5).jpg',
      name: '为爱追寻',
      src: 'http://www.gnerv.com:8080/gnerv/music/2.mp3',
    },
    audioAction: {
      method: 'pause'
    }

  },
  //事件处理函数
  slidethis: function(e) {
    var Ry = Math.floor(Math.random() * 1000 + 500);
    var Rr = Math.floor(Math.random() * 90);
    var Rx = Math.floor(Math.random() * 1000 + 500);

    console.log(e);
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'cubic-bezier(.8,.2,.1,0.8)',
    });
    var self = this;
    this.animation= animation;
    if (Ry < 1000){
      this.animation.translateY(Ry).rotate(Rr).translateX(Rx).step();
    }  else{
      this.animation.translateY(-Ry).rotate(-Rr).translateX(-Rx).step();
    }
    this.animation.translateY(60).translateX(25).rotate(0).step();
    this.setData({
      animationData: this.animation.export()
    });
    setTimeout(function() {
      var cardInfoList = self.data.cardInfoList;
      var slidethis = self.data.cardInfoList.shift();
      self.data.cardInfoList.push(slidethis);
      self.setData({
        cardInfoList: self.data.cardInfoList,
        animationData: {}
      });
    }, 350);
  },
  // buythis: function(e) {
  //   console.log(e);
  //   app.buyDetail = this.data.cardInfoList[e.target.id];
  //   wx.navigateTo({
  //     url: '../detail/detail'
  //   });
  // },



  onLoad: function () {
    this._enableInterval()

    if (app.globalData.backgroundAudioPlaying) {
      this.setData({
        playing: true
      })
    }
    this.play()
  },

  play: function (res) {
    var that = this
    wx.playBackgroundAudio({
      dataUrl: dataUrl,
      title: '此时此刻',
      coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      complete: function (res) {
        that.setData({
          playing: true
        })
      }
    })
    this._enableInterval()
    app.globalData.backgroundAudioPlaying = true
  },
  seek: function (e) {
    clearInterval(this.updateInterval)
    var that = this
    wx.seekBackgroundAudio({
      position: e.detail.value,
      complete: function () {
        // 实际会延迟两秒左右才跳过去
        setTimeout(function () {
          that._enableInterval()
        }, 2000)
      }
    })
  },
  pause: function () {
    var that = this
    wx.pauseBackgroundAudio({
      dataUrl: dataUrl,
      success: function () {
        that.setData({
          playing: false
        })
      }
    })
    app.globalData.backgroundAudioPlaying = false
  },
  stop: function () {
    var that = this
    wx.stopBackgroundAudio({
      dataUrl: dataUrl,
      success: function (res) {
        that.setData({
          playing: false,
          playTime: 0,
          formatedPlayTime: util.formatTime(0)
        })
      }
    })
    app.globalData.backgroundAudioPlaying = false
  },
  _enableInterval: function () {
    var that = this
    update()
    this.updateInterval = setInterval(update, 500)
    function update() {
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          that.setData({
            playTime: res.currentPosition,
            formatedPlayTime: util.formatTime(res.currentPosition + 1)
          })
        }
      })
    }
  },
  onUnload: function () {
    clearInterval(this.updateInterval)
  }

})
