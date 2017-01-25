export class CacheModel {
  
  /**
   *
   * @param name {String}
   * @param value {*}
   * @param [expire] {Number}
   */
  constructor(name,value,expire) {
    this.name = name;
    this.value = value;
    this.createdAt = this.usedAt = Date.now();
    this.frequency = 1;
    this.expire = expire;
  }
  
  /**
   * 引用计数递增
   * @returns {CacheModel}
   */
  increaseFrequency() {
    this.frequency++;
    return this;
  }
  
  /**
   * 更新使用时间
   * @returns {CacheModel}
   */
  updateUsedTime() {
    this.usedAt = Date.now();
    return this;
  }
  
  isExpired() {
    let {expire,usedAt}=this;
    return typeof expire==='number'? Date.now() - usedAt >= expire : false;
  }
}

export default class CacheList {
  
  /**
   *
   * @param [max] {Number}
   * @param [strategy] {*}
   * @param [expire] {Number}
   */
  constructor(option) {
    let {max, strategy, expire}=option||{};
    this.max = max||10;
    this.strategy = strategy;
    this.expire = expire;
    this.dataStore = [];
  }
  
  /**
   * 使用指定缓存策略
   * @param strategy {*}
   */
  use(strategy) {
    this.strategy = strategy;
  }
  
  /**
   * 数据存入缓存
   * @param name {String} 缓存名
   * @param value {*} 缓存数据
   * @param [expire] {Number} 缓存过期时间
   */
  put(name, value, expire) {
    
    //过期时间优先使用传入的时间，如果没有
    let cache = new CacheModel(name, value, expire || this.expire);
    
    this.strategy.beforePut.call(this);
    this.strategy.put.call(this, cache);
  }
  
  /**
   * 通过缓存名，查找缓存
   * @param name {String}
   * @returns {*}
   */
  get(name) {
    let cache = this.dataStore.find(item=>item.name === name);
    
    if (cache) {
      
      //如果缓存已经过期
      if (cache.isExpired()) {
        return this.remove(cache);
      }
      
      this.strategy.afterHit.call(this, cache);
      return cache.value;
    }
  }
  
  remove(cache) {
    let index = this.getItemIndex(cache);
    this.dataStore.splice(index, 1);
  }
  
  clear() {
    this.dataStore = [];
  }
  
  getLast() {
    return this.dataStore[this.dataStore.length - 1];
  }
  
  getFirst() {
    return this.dataStore[0];
  }
  
  getItemIndex(cache) {
    return this.dataStore.indexOf(cache);
  }
  
  getLength() {
    return this.dataStore.length;
  }
}