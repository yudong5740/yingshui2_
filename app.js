var Config = {
  text: "watermark",
  rotate: 15,
  xSpace: 20,
  ySpace: 20,
  size: 20,
  xStart: -50,
  yStart: 20,
  opacity: .2,
  color: "#000",
  width: 500,
  height: 500,
  imgUrl: "",
  id: "",
  parent: null
}, Context = null;
App({ 
  extend: function (origin, target) {
    for (var key in target) {
      target.hasOwnProperty(key) && (origin[key] = target[key]);
    }
    return origin;
  },
  getCanvas: function () {
    Context = wx.createCanvasContext(Config.id);
  },
  drawImg: function () {
    var that = this
    return new Promise(function (resolve, reject) {
      Context.setGlobalAlpha(1);
      Context.scale(1, 1);
      Context.drawImage(Config.imgUrl, 0, 0, Config.width, Config.height);
      Context.setFillStyle(Config.color);
      Context.setFontSize(Config.size);
      Context.rotate(Math.PI / 180 * Config.rotate);
      Context.setGlobalAlpha(Config.opacity);
      if (Config.scale < 1) {
        Context.scale(Config.scale, Config.scale);
      }
      that.insertMarks();
      Context.draw();
      resolve();
    });
  },
  insertMarks: function () {
    var xSpace = Config.xSpace,
      ySpace = Config.ySpace,
      len = Config.text.length,
      textHeight = Config.size + ySpace,
      textWidth = Config.size * len + xSpace,
      squareWidth = 0.72 * (Config.width + Config.height);
    if (Config.scale < 1) {
      squareWidth /= Config.scale;
    }
    for (var y = Config.yStart; y < squareWidth + textHeight; y += textHeight) {
      for (var x = Config.xStart; x < squareWidth + textWidth; x += textWidth) {
        Context.fillText(Config.text, x, y);
      }
    }
  },
  mark: function (userConfig) {
    userConfig = userConfig || {};
    Config = this.extend(Config, userConfig);
    return (this.getCanvas(), this.drawImg());
  },
  removeMarks: function (userConfig) {
    Context.clearRect(0, 0, Config.width, Config.height);
  },
  markBtns: function (userConfig) {
    this.removeMarks();
    userConfig = userConfig || {};
    Config = this.extend(Config, userConfig);
    return this.drawImg();
  },
})