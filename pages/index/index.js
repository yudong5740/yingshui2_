const app = getApp(); 
function extend(origin, target) {   
  for (var key in target) {
    target.hasOwnProperty(key) && (origin[key] = target[key]);
  }
  return origin;
}
var Config = {
  colorMap: [
    ['0', '#ffffff'],
    ['1', '#979797'],
    ['2', '#000000']
  ],
  waterMarkConfig: {
    color: '#ffffff',
    opacity: 0.5
  },
  text: '',
  debounce_Delay: 200,
  sliderNum: "0",
  sliderMax: "100",
  sliderMin: "0",
};
Page({ 
  data: {
    canvasW: 100,    
    canvasH: 300,  
    focus: false,
    inputValue: '', 
    currentColorIndex: 0,
    saves:0,
    savesOhter:"",
    nubs:0
  },
  
  getUserInfo: function (e) {
    //重新登录 
    console.log(e.detail.userInfo)
  },
  onLoad: function (option) {
    var list = option.Img_url.match(/[^$$$]+/g)
var res={
  width: list[1],
  height: list[2], 
              }
              var res1={
                tempFilePaths: [list[0]]
              }
              this.chooseImg(res,res1)
    console.log(option.Img_res)
  },
  onReady: function (event) {
    
    this.getDefaultConfig();
  },
  getDefaultConfig:function(){
    var colorType = Config.colorMap,
      waterMarkConfig = Config.waterMarkConfig,
      defaultColor = colorType.filter(function (color) {
        return color[1] == waterMarkConfig.color;
      });  
    this.setData({
      ColorType: colorType,
      defaultColorIndex: defaultColor.length ? defaultColor[0][0] : -1,  
      inputWord: Config.text,
      text: Config.text,
      sliderNum: Config.sliderNum,
      sliderMax: Config.sliderMax,
      sliderMin: Config.sliderMin
    });
  },
  touchImgstart: function (event) {   
    this.setData({
      touch: event.changedTouches[0],    
      touchStartTime: new Date()          
    });
  },
  touchImgend: function (event) {   
    var start = this.data.touch,
      end = event.changedTouches[0];
    var startTime = this.data.touchStartTime, endTime = new Date();
    if (endTime - startTime >= 350) {    
      return;
    }
    if (Math.abs(start.clientX - end.clientX) < 10 && Math.abs(start.clientY - end.clientY) < 10) {
      this.chooseImg();   
    }
  },
  onLongTrap: function (res) {   
    var that = this;
    wx.showActionSheet({       
      itemList: ['预览', '保存'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          that.previewImg();
        }
        if (res.tapIndex == 1) {
          that.save_img();
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    });
  },
  previewImg: function () {     
    if (!this.data.bg_BTNS) return false;
    wx.showLoading({
      title:'加载中'
    })
    wx.canvasToTempFilePath({   
      canvasId: 'myCanvas',
      destWidth: this.data.imgW,      
      destHeight: this.data.imgH,     
      success: function (res) {
        wx.hideLoading();
        wx.previewImage({
          urls: [res.tempFilePath]   
        })
      }
    });
  },
  chooseImg: function (res,res1) {    
    var that = this;
    var imgW = res.width,
      imgH = res.height;
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var scale = windowWidth / imgW;
    var canvasHeight = windowWidth * imgH / imgW;
    that.setData({
      canvasW: windowWidth,
      canvasH: canvasHeight,
      imgW: imgW,
      imgH: imgH
    });

    var config = {
      text: that.data.text,
      id: "myCanvas",
      color: '#ffffff',
      xStart: 0,
      yStart: -(res.width * 0.71),
      xSpace: 60,
      ySpace: 60,
      rotate: 45,
      opacity: 0.5,
      width: windowWidth,
      height: canvasHeight,
      scale: scale,
      size: 30,
      imgUrl: res1.tempFilePaths[0]
    };
    config = Object.assign(config, Config.waterMarkConfig);
    config.text = Config.text;
    app.mark(config).then(function () {
      that.setData({
        bg_BTNS: true,
        sliderMin: parseInt(imgW / 100 * 2),
        sliderMax: parseInt(imgW / 10 * 2),
        sliderNum: parseInt(imgW / 100 * 4)
      });
    });
  }, 
  bindKeyInput: debounce(function (e) {    
    this.setData({
      inputValue: e.detail.value
    })
    Config.text = this.data.inputValue;
    if (this.data.bg_BTNS) app.markBtns({    
      text: e.detail.value
    });
  }, Config.debounce_Delay), 

  onColor_type:function(e){
    var IdCo = e.target.id
    if (!IdCo) return;
    this.setData({
      currentColorIndex: IdCo
    })
    Config.waterMarkConfig.color = this.data.ColorType[IdCo][1];
    if (this.data.bg_BTNS) app.markBtns({   
      color: Config.waterMarkConfig.color
    });
  }, 
  onSize: debounce(function (e) {
    this.setData({
      size: e.detail.value
    }) 
    Config.waterMarkConfig.size = this.data.size;
    console.log(e.detail.value)
    if (this.data.bg_BTNS) app.markBtns({   
      size: e.detail.value
    }); 
  }, Config.debounce_Delay), 

  save_img: function (event) {
    // this.data.saves+=1;
    // var savesOhtera=1;
    // var nubsa=2;
    // this.setData({
    //   saves: this.data.saves,
    //   savesOhter: savesOhtera,
    //   nubs: nubsa
    // }) 
    if (!this.data.bg_BTNS) return false;
    wx.showLoading({
      title: '保存中',
    });
    wx.canvasToTempFilePath({  
      canvasId: 'myCanvas',
      destWidth: this.data.imgW,
      destHeight: this.data.imgH,
      success: function (res) {
        wx.saveImageToPhotosAlbum({  
          filePath: res.tempFilePath,    
          success: function (res) {
            wx.hideLoading();
            wx.showToast({
              title: '已保存到相册',
              icon: 'success',
              duration: 2000
            });
          }
        });
      }, fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '相册',
          icon: 'success',
          duration: 2000
        });
        console.log(res)
      }
    });
     
  },
})
function debounce(func, wait) {
  var timeout, args, context, timestamp, result; 
  var later = function () {
    var last = new Date().getTime() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    }
  }; 
  return function () {
    context = this;
    args = arguments;
    timestamp = new Date().getTime();
    if (!timeout) timeout = setTimeout(later, wait);
    return result;
  };
};