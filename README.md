# dwy-cache
javascript data cache

###安装

```
$ npm install dwy-cache --save
```
###使用

1. 通过script引入

```html
<script src="../node_modules/dwy-cache/dist/bundle.js"></script>

var cacheList=new dwyCache.CacheList();
var fifoStrategy=new dwyCache.FIFOStrategy();

cacheList.use(fifoStrategy);

fetch('someurl',params)
  .then(function(resp){
    var name='someurl?'+$.params(params);
    cacheList.put(name,resp.body);
  })
```
