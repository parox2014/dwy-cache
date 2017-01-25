import FIFOStrategy from './fifo'

/**
 *
 */
export default class LFUStrategy extends FIFOStrategy {
  
  /**
   * 将缓存数据放入数据
   * @param cache {CacheModel}
   */
  put(cache) {
    
    this.dataStore.unshift(cache);
  }
  
  /**
   * 缓存命中后
   * @param cache
   */
  afterHit(cache) {
    
    let {dataStore}=this;
    
    //每次命中缓存，缓存的引用计数增加
    //更新使用使间
    //重新按引用次数与时间排序
    cache.increaseFrequency();
    cache.updateUsedTime();
    
    dataStore.sort((itemA, itemB) => {
      
      //首先按缓存的使用次数排序，
      //如果使用次数相同，则比较最近使用的时间
      //时间越近的排在后面
      if (itemA.frequency === itemB.frequency) {
        return itemA.usedAt - itemB.usedAt;
      }
      
      return itemA.frequency - itemB.frequency;
    });
  }
}