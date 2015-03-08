# jquery.image-size-assign.js

jQuery plugin to force set `img` size attribute(width, height).

```html
<!-- before: image but width and height attributes are not defined -->
<img src="http://placehold.it/350x150">

<!-- after: image size is set -->
<img src="foo.png" width="350" height="150">
```

## How to use

```javascript
$(function(){
  $("img").imageSizeAssign({
    maxSize:{
      width:500,
      height:500
    },
    onSize:function(size){
      return size;
    },
    onComplete:function(){
      //console.log("all sizes are set");
    }
  });
});
```

## Option

### maxSize

If defined, image size is rounded by `maxSize` keeping original image size rate.

### onSize

Callback function after image size is obtained and rounded.

### onComplete

Callback function all size of images are obtained.

## License

MIT
