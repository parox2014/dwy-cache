export default class FIFOStrategy{
  
  /**
   * 将缓存数据存入数组
   * @param cache {CacheModel}
   */
  put(cache){
    this.dataStore.push(cache);
  }
  
  /**
   * 缓存存入数组之前，先检测数组的长度是否已经超过max，
   * 如果已经超过，先移除数组头部的数据
   */
  beforePut(){
    let len=this.dataStore.length;
    if(len>=this.max){
      this.dataStore.shift();
    }
  }
  afterHit(){
    
  }
}