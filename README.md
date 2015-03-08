# jquery.image-size-assign.js

jQuery plugin to force set `img` size attribute(width, height).

```html
<!-- before -->
<img src="http://placehold.it/350x150">

<!-- after -->
<img src="http://placehold.it/350x150" width="350" height="150">
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

If defined, each size is rounded by `maxSize` if overflow, keeping original rate of size.

### onSize

Callback function after each size is obtained and rounded.

### onComplete

Callback function after all sizes are set.

## License

MIT
