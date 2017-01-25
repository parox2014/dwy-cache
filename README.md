# dwy-cache
javascript data cache

###安装

```
$ npm install dwy-cache --save
```
###引入

1. script

```html
<script src="../node_modules/dwy-cache/dist/bundle.js"></script>

//引入后，dwyCache会挂载在window对象上
//然后可以通过dwyCache.CacheList/dwyCache.FIFOStrategy/dwyCache.LRUStrategy/dwyCache.LFUStrategy

```
2. es2015

```
  import {CacheList ,FIFOStrategy,LRUStrategy,LFUStrategy} from 'dwy-cache'
```

3. cmd

```
  var dwyCache=require('dwy-cache');
```

###使用

```
import {CacheList ,FIFOStrategy,LRUStrategy,LFUStrategy} from 'dwy-cache'

var fifoStrategy=new FIFOStrategy();
var lruStrategy=new LRUStrategy();
var lfuStrategy=new LFUStrategy();

var cacheList=new dwyCache.CacheList({
  strategy:fifoStrategy,//缓存策略
  max:100,//最大缓存数目，当缓存超过此数，会根据淘汰策略删除缓存
  expire:3000//缓存过期时间,单位毫秒
});

//实例化时，可以不传入strategy
//通过cacheList.use使用策略
cacheList.use(lruStrategy);
cacheList.use(lfuStrategy);

export class TodoService{

  static todoListURL='/todos';
  
  static query(params){
    var defer=$.Deferred();
    var {todoListURL}=this;
    var cacheName=todoListURL+'?'+$.param(params);
    var data=cacheList.get(cacheName);
      
    if(data){
      return defer.resolve(data);
    }
      
    $.get(todoListURL,{data:params})
      .done(function(resp){
          
        cacheList.put(cacheName,resp);
        defer.resolve(resp);
      });
    
    return defer;
  }
}
```