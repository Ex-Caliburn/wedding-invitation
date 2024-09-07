/*! For license information please see zepto.fullpage.js.LICENSE.txt */
!function(t,e){if(void 0===t)throw new Error("zepto.fullpage's script requires Zepto");var n=null,i={page:".page",start:0,duration:500,loop:!1,drag:!1,dir:"v",der:.1,change:function(t){},beforeChange:function(t){},afterChange:function(t){},orientationchange:function(t){}};function o(t){t.preventDefault()}function s(t,e,n){var i="0px",o="0px";"v"===e?o=n+"px":i=n+"px",t.css({"-webkit-transform":"translate3d("+i+", "+o+", 0px);",transform:"translate3d("+i+", "+o+", 0px);"})}function h(e,n){var o=t.extend(!0,{},i,n);this.$this=e,this.curIndex=-1,this.o=o,this.startY=0,this.movingFlag=!1,this.$this.addClass("fullPage-wp"),this.$parent=this.$this.parent(),this.$pages=this.$this.find(o.page).addClass("fullPage-page fullPage-dir-"+o.dir),this.pagesLength=this.$pages.length,this.update(),this.initEvent(),this.start()}t.extend(h.prototype,{update:function(){"h"===this.o.dir&&(this.width=this.$parent.width(),this.$pages.width(this.width),this.$this.width(this.width*this.pagesLength)),this.height=this.$parent.height(),this.$pages.height(this.height),this.moveTo(this.curIndex<0?this.o.start:this.curIndex)},initEvent:function(){var t=this,n=this.$this;n.on("touchstart",(function(e){return t.status?t.movingFlag?0:(t.startX=e.targetTouches[0].pageX,void(t.startY=e.targetTouches[0].pageY)):1})),n.on("touchend",(function(e){if(!t.status)return 1;if(t.movingFlag)return 0;var n="v"===t.o.dir?(e.changedTouches[0].pageY-t.startY)/t.height:(e.changedTouches[0].pageX-t.startX)/t.width,i=n>t.o.der||n<-t.o.der?n>0?-1:1:0;t.moveTo(t.curIndex+i,!0)})),t.o.drag&&n.on("touchmove",(function(e){if(!t.status)return 1;if(t.movingFlag)return t.startX=e.targetTouches[0].pageX,t.startY=e.targetTouches[0].pageY,0;var i=e.changedTouches[0].pageY-t.startY;(0==t.curIndex&&i>0||t.curIndex===t.pagesLength-1&&i<0)&&(i/=2);var o=e.changedTouches[0].pageX-t.startX;(0==t.curIndex&&o>0||t.curIndex===t.pagesLength-1&&o<0)&&(o/=2);var h="v"===t.o.dir?-t.curIndex*t.height+i:-t.curIndex*t.width+o;n.removeClass("anim"),s(n,t.o.dir,h)})),e.addEventListener("orientationchange",(function(){180!==e.orientation&&0!==e.orientation||t.o.orientationchange("portrait"),90!==e.orientation&&-90!==e.orientation||t.o.orientationchange("landscape")}),!1),e.addEventListener("resize",(function(){t.update()}),!1)},holdTouch:function(){t(document).on("touchmove",o)},unholdTouch:function(){t(document).off("touchmove",o)},start:function(){this.status=1,this.holdTouch()},stop:function(){this.status=0,this.unholdTouch()},moveTo:function(t,n){var i=this,o=this.$this,h=this.curIndex;if((t=function(t,e,n){return t<0?n?e-1:0:t>=e?n?0:e-1:t}(t,this.pagesLength,this.o.loop),n?o.addClass("anim"):o.removeClass("anim"),t!==h)&&!1===this.o.beforeChange({next:t,cur:h}))return 1;return this.movingFlag=!0,this.curIndex=t,s(o,this.o.dir,-t*("v"===this.o.dir?this.height:this.width)),t!==h&&this.o.change({prev:h,cur:t}),e.setTimeout((function(){i.movingFlag=!1,t!==h&&(i.o.afterChange({prev:h,cur:t}),i.$pages.removeClass("cur").eq(t).addClass("cur"))}),i.o.duration),0},movePrev:function(t){this.moveTo(this.curIndex-1,t)},moveNext:function(t){this.moveTo(this.curIndex+1,t)},getCurIndex:function(){return this.curIndex}}),t.fn.fullpage=function(e){return n||(n=new h(t(this),e)),this},t.fn.fullpage.version="0.5.0",t.each(["update","moveTo","moveNext","movePrev","start","stop","getCurIndex","holdTouch","unholdTouch"],(function(e,i){t.fn.fullpage[i]=function(){return n?n[i].apply(n,arguments):0}}))}(Zepto,window);