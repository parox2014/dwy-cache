var dwyCache=require('../dist/dwy-cache');
var assert=require('assert');


var cacheList=new dwyCache.CacheList();


describe('Cache',function () {
  
  describe('Cache.use(FIFO)',function () {
    
    it('cacheList.strategy should eq fifoStrategy',function () {
      var fifoStrategy=new dwyCache.FIFOStrategy();
  
      cacheList.use(fifoStrategy);
      
      assert.equal(fifoStrategy,cacheList.strategy);
      
    });
  
    describe('FIFO#put',function () {
    
      it('put 20 item in cacheList,it\' length should eq max 10 ',function () {
      
        for(var i=0;i<20;i++){
          cacheList.put('name'+i,'value'+i);
        }
      
        assert.equal(cacheList.getLength(),cacheList.max);
      });
    });
  
    describe('FIFO#get',function () {
    
      it('name19\'s value should eq value19,name10\'s value should eq value10',function () {
        
        assert.strictEqual(cacheList.get('name19'),'value19');
        assert.strictEqual(cacheList.get('name10'),'value10');
        
      });
    });
    
  });
  
  describe('Cache.use(LRU)',function () {
    
    it('cacheList.strategy should eq lruStrategy',function () {
      
      var lruStrategy=new dwyCache.LRUStrategy();
  
      cacheList.use(lruStrategy);
      
      assert.strictEqual(cacheList.strategy,lruStrategy);
    });
  
    describe('LRU#put',function () {
    
      it('put 20 item in cacheList,it\' length should eq max 10 ',function () {
      
        for(var i=0;i<20;i++){
          cacheList.put('name'+i,'value'+i);
        }
      
        assert.equal(cacheList.getLength(),cacheList.max);
      });
    });
    
    describe('LRU#get',function () {
      it('get item name12,the item should move to end,so the last item\'s value should eq value12',function () {
        
        var name12=cacheList.get('name12');
        var lastOne=cacheList.getLast();
        
        assert.strictEqual(name12,'value12');
        assert.strictEqual(lastOne.value,name12);
        
      });
    })
  });
  
  describe('Cache.use(LFU)',function () {
    
    it('cacheList.strategy should eq lfuStrategy',function () {
      
      var lfuStrategy=new dwyCache.LFUStrategy();
  
      cacheList.use(lfuStrategy);
      
      assert.strictEqual(cacheList.strategy,lfuStrategy);
    });
  
    describe('LFU#put',function () {
    
      it('put 20 item in cacheList,it\' length should eq max 10 ',function () {
      
        for(var i=0;i<20;i++){
          cacheList.put('name'+i,'value'+i);
        }
      
        assert.equal(cacheList.getLength(),cacheList.max);
      });
    });
    
    describe('LFU#get',function () {
      it('get item name12 5 times,the item12 should move to end,so the last item\'s value should eq value12',function () {
        
        var firstOne=cacheList.getFirst();
        
        assert.strictEqual(firstOne.value,'value19');
        
        var i=1;
        
        cacheList.get('name12');
        i++;
        
        cacheList.get('name12');
        i++;
        
        cacheList.get('name12');
        i++;
        
        cacheList.get('name12');
        i++;
        
        var item12=cacheList.get('name12');
        i++;
        
        var lastOne=cacheList.getLast();
        
        assert.strictEqual(item12,'value12');
        assert.strictEqual(lastOne.value,item12);
        assert.strictEqual(lastOne.frequency,i);
      });
    })
  });
  
  describe('Cache#setMax',function () {
    
    it('setMax(8),cacheList length should eq 8',function () {
      
      assert.strictEqual(cacheList.getLength(),10);
      
      cacheList.setMax(8);

      assert.strictEqual(cacheList.getLength(),8);
      
    });
    
    it('setMax(null),cacheList should throw an error',function () {
      
      assert.throws(function () {
        cacheList.setMax();
      },/number/)
      
    });
    
  });
  
  describe('Cache#clear',function () {
    
    it('cacheList length should eq 0',function () {
      
      cacheList.clear();
      
      assert.deepEqual(cacheList.getLength(),0);
      
    });
    
  });
});
