// 滚屏动画控制
if (isMobile !== false) {
  var loadTimer = setInterval(() => {
    console.log(loadSum);
    if (loadSum >= 4) {
      start();
    }
  }, 300);
}

// promise
const getSignPromise = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  // xhr.open("GET", location.origin + "/api/sign?url=" + location.href, true);
  xhr.open(
    "GET",
    "http://loveisforever.cn" + "/api/sign?url=" + location.href,
    true
  );
  xhr.send();
  xhr.onload = () => {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        const result = JSON.parse(xhr.response);
        console.log(result);
        resolve(result);
      }
    }
  };
});

// 分享
getSignPromise.then((res) => {
  getWeShare(res);
});

/***
 * 微信分享
 */
const getWeShare = (params) => {
  console.log("getWeShare params", params);
  wx.config({
    // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: params.appId, // 必填，公众号的唯一标识
    timestamp: params.timestamp, // 必填，生成签名的时间戳
    nonceStr: params.nonceStr, // 必填，生成签名的随机串
    signature: params.signature, // 必填，签名
    jsApiList: [
      "updateAppMessageShareData",
      "updateTimelineShareData",
      "onMenuShareQQ",
      "onMenuShareWeibo",
      "openLocation",
    ], // 必填，需要使用的JS接口列表
  });

  wx.ready(function () {
    //需在用户可能点击分享按钮前就先调用

    const data = {
      title: "李霁野&彭佳仪的婚礼邀请",
      desc: "我们将于2024年10月1日举行婚礼，诚挚邀请您的到来",
      link: "http://loveisforever.cn",
      imgUrl: "http://loveisforever.cn/public/photo/share.png",
      success: function () {
        // 设置成功
        console.log("share success");
      },
    };

    wx.onMenuShareQQ(data);
    wx.onMenuShareWeibo(data);
    wx.updateTimelineShareData(data);
    wx.updateAppMessageShareData(data);
  });
};

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
  if (!domLists) {
    return;
  }
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
    // var mapCenter = [27.831009, 113.099109];
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
      // window.location.href = "https://j.map.baidu.com/e1/e1_";
      let {latitude, longitude} = transformFromBaiduToGCJ(mapCenter[1], mapCenter[0]);
      // var mapCenter2 = [113.092545, 27.831009];
      wx.openLocation({
        latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
        longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
        name: "沄和酒楼", // 位置名
        address: "湖南省株洲市天元区珠江北路999号", // 地址详情说明
        scale: 28, // 地图缩放级别,整型值,范围从1~28。默认为最大
        infoUrl: "", // 在查看位置界面底部显示的超链接,可点击跳转
      });
    });
    // document.querySelector("#map").addEventListener("click", () => {
    //   console.log("map click");
    //   mapCenter = [113.092581, 27.831009];
    //   wx.openLocation({
    //     latitude: mapCenter[0], // 纬度，浮点数，范围为90 ~ -90
    //     longitude: mapCenter[1], // 经度，浮点数，范围为180 ~ -180。
    //     name: "沄和酒楼", // 位置名
    //     address: "湖南省株洲市天元区珠江北路999号", // 地址详情说明
    //     scale: 1, // 地图缩放级别,整型值,范围从1~28。默认为最大
    //     infoUrl: "", // 在查看位置界面底部显示的超链接,可点击跳转
    //   });
    // });
  }
}

function transformFromBaiduToGCJ (latitude, longitude) {
  var xPi = 3.14159265358979324 * 3000.0 / 180.0;
  var x = longitude - 0.0065;
  var y = latitude - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * xPi);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * xPi);
  var a_latitude = z * Math.sin(theta);
  var a_longitude = z * Math.cos(theta);
  return {
      latitude: a_latitude,
      longitude: a_longitude
  };
};

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
        playBtn.style.animationPlayState = "running";
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
