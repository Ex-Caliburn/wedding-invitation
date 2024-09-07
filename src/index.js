// 滚屏动画控制
if (isMobile !== false) {
  var loadTimer = setInterval(() => {
    console.log(loadSum);
    if (loadSum >= 4) {
      start();
    }
  }, 300);
}

// wx.config({
//   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//   appId: '', // 必填，公众号的唯一标识
//   timestamp: '', // 必填，生成签名的时间戳
//   nonceStr: '', // 必填，生成签名的随机串
//   signature: '',// 必填，签名
//   jsApiList: [] // 必填，需要使用的JS接口列表
// });

// let config = {
//   title: '彭佳仪&李霁野的婚礼',
//   desc: '特别邀请您参加彭佳仪&李霁野的婚礼',
//   link: 'http://loveisforever.cn',
//   imgUrl: 'http://loveisforever.cn/public/favicon.png'
// }
// console.log('registerShare config', config)
// wx.ready(function () {
//   // 分享朋友
//   //   title: config.title, // 分享标题
//   //   desc: config.desc, // 分享描述
//   //   imgUrl: config.imgUrl, // 分享图标
//   //   link: config.link, // 分享链接，该链接域名必须与当前企业的可信域名一致
//   wx.updateAppMessageShareData({
//     ...config,
//     type: 'link', // 分享类型,music、video或link，不填默认为link
//     dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空,
//     success: function () {
//       console.log('updateAppMessageShareData success')
//       // 用户确认分享后执行的回调函数
//       config.successFun && config.successFun()
//     }
//   })

//   // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
//   wx.updateTimelineShareData({
//     ...config,
//     // title: config.desc,
//     type: 'link', // 分享类型,music、video或link，不填默认为link
//     dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空,
//     success: function () {
//       console.log('updateTimelineShareData  success')
//       // 用户确认分享后执行的回调函数
//       config.successFun && config.successFun()
//     }
//   })

//   // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
//   wx.onMenuShareAppMessage({
//     ...config,
//     type: 'link', // 分享类型,music、video或link，不填默认为link
//     dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空,
//     success: function () {
//       console.log('onMenuShareAppMessage success')
//       // 用户确认分享后执行的回调函数
//       config.successFun && config.successFun()
//     }
//   })
// })

var domLists = [];
var mapFlag = false;

function start() {
  clearInterval(loadTimer);

  var forEach = [].forEach;

  setTimeout(() => {
    document.getElementById("loading-mask").style.display = "none";
  }, 100);
  document.getElementsByClassName("wp-inner")[0].fullpage({
    change: function (e) {
      clearTime();
      // 移除动画属性
      forEach.call(
        document
          .querySelectorAll(".page")
          [e.cur].querySelectorAll(".js-animate"),
        function (v) {
          v.classList.add("hide");
          v.classList.remove(v.dataset["animate"]);
          if (v.dataset["sec"]) {
            v.classList.remove(v.dataset["sec"]);
          }
        }
      );
    },
    afterChange: function (e) {
      if (e.cur === 5 && !mapFlag) {
        initMap();
      }

      domLists = document
        .querySelectorAll(".page")
        [e.cur].querySelectorAll(".js-animate");
      forEach.call(domLists, (v) => {
        var time = v.dataset.time;
        v.timer = setTimeout(function () {
          v.classList.add(v.dataset["animate"]);
          v.classList.remove("hide");
          if (v.dataset["sec"]) {
            var time = v.dataset.sectime || 0;
            v.sectimer = setTimeout(function () {
              v.classList.remove(v.dataset["animate"]);
              v.classList.add(v.dataset["sec"]);
            }, time);
          }
        }, time);
      });
    },
  });
}

function clearTime() {
  domLists.forEach((dom, i, arr) => {
    if (dom.timer) {
      clearTimeout(dom.timer);
    }
    if (dom.sectimer) {
      clearTimeout(dom.sectimer);
    }
    if (arr && arr.splice) {
      arr.splice(i, 1);
    }
  });
}

// 地图
function initMap() {
  if (window.BMap) {
    mapFlag = true;
    // var mapCenter = [104.083002, 30.5621]
    var mapCenter = [113.099109, 27.831009];
    var map = new BMap.Map("map", { minZoom: 10, maxZoom: 14 });

    map.centerAndZoom(new BMap.Point(mapCenter[0], mapCenter[1]), 13);

    function ComplexCustomOverlay(point, text, mouseoverText) {
      this._point = point;
      this._text = text;
      this._overText = mouseoverText;
    }
    ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function (map) {
      this._map = map;
      var div = (this._div = document.createElement("div"));
      div.style.position = "absolute";
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
      div.style.backgroundColor = "#E60000";
      div.style.borderRadius = "3px";
      div.style.color = "white";
      div.style.height = "18px";
      div.style.padding = "2px 4px";
      div.style.lineHeight = "18px";
      div.style.whiteSpace = "nowrap";
      div.style.MozUserSelect = "none";
      div.style.fontSize = "12px";
      var span = (this._span = document.createElement("span"));
      div.appendChild(span);
      span.appendChild(document.createTextNode(this._text));
      var that = this;

      var arrow = (this._arrow = document.createElement("div"));
      // arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
      arrow.style.position = "absolute";
      arrow.style.width = "0";
      arrow.style.height = "0";
      arrow.style.top = "22px";
      arrow.style.left = "10px";
      arrow.style.overflow = "hidden";
      arrow.style.border = "6px solid transparent";
      arrow.style.borderTop = "6px solid #E60000";
      div.appendChild(arrow);

      map.getPanes().labelPane.appendChild(div);

      return div;
    };
    ComplexCustomOverlay.prototype.draw = function () {
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
      this._div.style.top = pixel.y - 30 + "px";
    };

    var myCompOverlay = new ComplexCustomOverlay(
      new BMap.Point(mapCenter[0], mapCenter[1]),
      "婚礼",
      "N and Y"
    );

    map.addOverlay(myCompOverlay);

    document.querySelector("#location-btn").addEventListener("click", () => {
      map.panTo(new BMap.Point(mapCenter[0], mapCenter[1]));
      // wx.openLocation({
      //   latitude: mapCenter[0], // 纬度，浮点数，范围为90 ~ -90
      //   longitude: mapCenter[1], // 经度，浮点数，范围为180 ~ -180。
      //   name: '湖南省株洲市天元区珠江北路999号 沄和酒楼', // 位置名
      //   address: '', // 地址详情说明
      //   scale: 1, // 地图缩放级别,整型值,范围从1~28。默认为最大
      //   infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      // });
    });
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  startPlayMp3();
});
// 音乐播放控制
window.onload = function () {
  startPlayMp3();
};

function startPlayMp3() {
  let mp3 = document.querySelector("#mp3");
  let playBtn = document.querySelector("#play-btn");
  let play;
  mp3.load();

  document.addEventListener(
    "WeixinJSBridgeReady",
    function () {
      mp3.play();
      if (!mp3.paused) {
        this.style.animationPlayState = "running";
        mp3.play();
        play = true;
      }
    },
    false
  );

  console.log(mp3.paused, mp3.readyState);
  play = !mp3.paused && mp3.readyState === 4;

  if (play) {
    playBtn.style.animationPlayState = "running";
  } else {
    playBtn.style.animationPlayState = "paused";
  }

  playBtn.addEventListener("click", function (event) {
    if (play) {
      this.style.animationPlayState = "paused";
      mp3.pause();
      play = false;
    } else {
      if (mp3.readyState === 4) {
        this.style.animationPlayState = "running";
        mp3.play();
        play = true;
      }
    }
  });
}
