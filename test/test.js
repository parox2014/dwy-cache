var dwyCache=require('../dist/bundle');
var assert=require('assert');


var cacheList=new dwyCache.CacheList({});

describe('Cache.FIFO',function () {
  
  var fifoStrategy=new dwyCache.FIFOStrategy();
  
  cacheList.use(fifoStrategy);
  
  describe('FIFO.put',function () {
    
    it('put 20 item in cacheList,it\' length should eq max 10 ',function () {
      
      for(var i=0;i<20;i++){
        cacheList.put('name'+i,'value'+i);
      }
    
      assert.equal(cacheList.getLength(),cacheList.max);
    });
  });
  
  describe('FIFO.get',function () {
    
    it('name19\'s value should eq value19,name10\'s value should eq value10',function () {
      assert.equal(cacheList.get('name19'),'value19');
      assert.equal(cacheList.get('name10'),'value10');
    });
  });
});

describe('Cache.LRU',function () {
  
  var lruStrategy=new dwyCache.LRUStrategy();
  
  cacheList.use(lruStrategy);
  
  
  
  describe('LRU.get',function () {
    it('get item name12,the item should be the new last one after hit,the origin last one index should eq length-2',function () {
  
      var lastOne=cacheList.getLast();
      var name12=cacheList.get('name12');
      var newlastOne=cacheList.getLast();
  
      assert.equal(cacheList.strategy,lruStrategy);
      assert.equal(name12,newlastOne.value);

    });
  })
});