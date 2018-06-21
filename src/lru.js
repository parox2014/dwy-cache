import {FIFOStrategy} from './fifo'

export class LRUStrategy extends FIFOStrategy{
  
  /**
   * 缓存命中后执行的操作
   * @param cache {CacheModel}
   */
  afterHit(cache){
    let {dataStore}=this;
    let index=this.getItemIndex(cache);
    
    //将命中的缓存压入栈顶
    dataStore.splice(index,1);
    dataStore.push(cache);
  }
}