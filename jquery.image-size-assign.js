/*!
  jquery.image-size-assign.js
  
  Copyright (c) 2015 Watanabe Masaki.
  License: MIT
*/

;(function($){
  $.fn.imageSizeAssign = function(options){
    var elements = this;
    var opt = $.extend({}, $.fn.imageSizeAssign.defaults, options);
    var $images = elements.filter(function(){
      return this.getAttribute("src") !== "undefined";
    });

    if($images.length === 0){
      opt.onComplete();
      return;
    }

    var round_by_width = function(w, h, max_width){
      var delta = w - max_width;
      var slope = h / w;
      return {width:max_width, height:(h - Math.floor(delta * slope))};
    };

    var round_by_height = function(w, h, max_height){
      var delta = h - max_height;
      var slope = w / h;
      return {width:(w - Math.floor(delta * slope)), height:max_height};
    };

    var round_size = function(w, h, max_size){
      var over_w = w - max_size.width;
      var over_h = h - max_size.height;
      if(over_w <= 0 && over_h <= 0){ // if(w <= max_size.width && h <= max_size.height)
	return {width:w, height:h}; // nothing to do
      }
      // width only overflow
      if(over_w > 0 && over_h < 0){
	return round_by_width(w, h, max_size.width);
      }
      // height only overflow
      if(over_w < 0 && over_h > 0){
	return round_by_height(w, h, max_size.height);
      }
      // both overflow, but width impact is larger.
      if(over_w > over_h){
	return round_by_width(w, h, max_size.width);
      }
      // both overflow, but height impact is larger.
      return round_by_height(w, h, max_size.height);
    };

    // http://stackoverflow.com/questions/8682085/can-i-sync-up-multiple-image-onload-calls#8682143
    var image_collector = function(expected_count, on_complete){
      var received_count = 0;
      return function(){
	if(++received_count === expected_count){
	  on_complete();
	}
      };
    };

    var on_image_loaded = image_collector($images.length, opt.onComplete || function(){});

    $images.each(function(i, dom){
      var $dom = $(dom);
      var img = new Image(); // temporally image placeholder.

      // if image successfully loaded,
      // 1. round image size if option 'maxSize' is defined.
      // 2. call callback function 'onSize' if defined.
      img.onload = function(){
	var size = opt.maxSize?
	  round_size(parseInt(img.width, 10), parseInt(img.height, 10), opt.maxSize)
	: {width:img.width, height:img.height};
	//console.log("%s, size=(%d,%d)", $dom.attr("src"), size.width, size.height);
	//console.log("success!");
	size = opt.onSize? opt.onSize(size) : size;
	$dom.attr("width", size.width);
	$dom.attr("height", size.height);
	on_image_loaded();
      };

      // sometimes loading process failed, but we must make counter incremented.
      img.onerror = function(){
	//console.log("falied!");
	on_image_loaded();
      };

      // set src attribute to temporally placeholder, and loading process starts.
      // callback onload if success, onerror if failed.
      img.src = $dom.attr("src");
    });
  };

  $.fn.defaults = {
    maxSize:{
      width:500,
      height:500
    },
    onSize:function(size){
      return size;
    },
    onComplete:function(){
      console.log("all image sizes are set.");
    }
  };
})(jQuery);
