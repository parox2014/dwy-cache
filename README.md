# dwy-cache
a javascript data cache plugin

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

```js
  import {CacheList ,FIFOStrategy,LRUStrategy,LFUStrategy} from 'dwy-cache'
```

3. cmd

```js
  var dwyCache=require('dwy-cache');
```

###使用

```js
import {CacheList ,FIFOStrategy,LRUStrategy,LFUStrategy} from 'dwy-cache'
import {Http,URLSearchParams} from 'http'


var fifoStrategy=new FIFOStrategy();
var lruStrategy=new LRUStrategy();
var lfuStrategy=new LFUStrategy();

//创建缓存列表
var cacheList=new CacheList({
  strategy:fifoStrategy,//缓存策略
  max:100,//最大缓存数目，当缓存超过此数，会根据淘汰策略删除缓存
  expire:3000//缓存过期时间,单位毫秒
});

//实例化时，可以不传入strategy
//通过cacheList.use使用策略
cacheList.use(lruStrategy);
cacheList.use(lfuStrategy);

//将数据放入缓存列表
cacheList.put('cacheName','data',3000);

//根据名称取出缓存
var cacheData=cacheList.get('cacheName');

//清空缓存
cacheList.clear();

//获取缓存数目
cacheList.getLength();
```

###示例

```js
import {CacheList ,LFUStrategy} from 'dwy-cache'
import {Http,URLSearchParams} from 'http'


var cacheList=new CacheList({
  strategy:new LFUStrategy()
});

export class TodoService{

  static todoListURL='/todos';
  
  static query(params){

    var {todoListURL}=this;
    var cacheName=todoListURL+'?'+new URLSearchParams(params).toString();
    var data=cacheList.get(cacheName);
      
    if(data){
      return Promise.resolve(data);
    }
      
    return Http.get(todoListURL,{data:params})
      .then(function(resp){
          
        cacheList.put(cacheName,resp.data);
        return resp.data;
      });
  }
}
```