import { Strategy } from "./strategy";
import { deprecated } from "./deprecated";

export class CacheModel {

  /**
   *
   * @param {string} name
   * @param {any} value
   * @param {number} [expire]
   */
  constructor(name, value, expire) {
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

  /**
   * 是否过期
   */
  get isExpired() {
    const { expire, usedAt } = this;
    return typeof expire === 'number' ? Date.now() - usedAt >= expire : false;
  }

  /**
   * 重置时间与使用次数
   */
  reset() {
    this.createdAt = this.usedAt = Date.now();
    this.frequency = 1;
    return this;
  }
}

export class CacheList {
  /**
   * @type {number}
   */
  max;
  /**
   * @type {Strategy}
   */
  _strategy;

  /**
   * @type {number}
   */
  expire;

  /**
   * @type {CacheModel[]}
   */
  dataStore;
  /**
   * @param {Object} option
   * @param {number} [option.max]
   * @param {any} [option.strategy]
   * @param {number} [option.expire]
   */
  constructor(option) {
    let { max=10, strategy, expire } = option || {};
    this.max = max;
    this._strategy = strategy;
    this.expire = expire;
    this.dataStore = [];
  }

  get strategy() {

    if (!this._strategy) throw new Error('must set strategy first.set strategy via cacheList.use(strategy)');

    return this._strategy;

  }
  /**
   * 使用指定缓存策略
   * @param {Strategy} strategy
   */
  use(strategy) {

    this._strategy = strategy;

    const { dataStore } = this;

    dataStore.forEach(item => item.reset());
  }

  /**
   * 数据存入缓存
   * @param {string} name 缓存名
   * @param {any} value 缓存数据
   * @param {number} [expire] 缓存过期时间
   */
  put(name, value, expire) {

    //过期时间优先使用传入的时间
    const cache = new CacheModel(name, value, expire || this.expire);

    this.strategy.beforePut.call(this);
    this.strategy.put.call(this, cache);
  }

  /**
   * 通过缓存名，查找缓存
   * @param {string} name 
   * @returns {any}
   */
  get(name) {
    const cache = this.dataStore.find(item => item.name === name);
    
    if (cache) {

      //如果缓存已经过期
      if (cache.isExpired) {
        return this.remove(cache);
      }

      this.strategy.afterHit.call(this, cache);
      return cache.value;
    }
  }

  /**
   * 设置最大值
   * @param {number} newMax
   */
  setMax(newMax) {

    if (typeof newMax !== 'number') throw new Error('[DwyCache]max should be a number');

    let { max, dataStore } = this;

    this.max = newMax;

    if (dataStore.length < newMax) return;

    if (newMax < max) {
      this.dataStore.splice(0, max - newMax);
    }

  }
  /**
   * 
   * @param {CacheModel} cache 删除指定的cache
   */
  remove(cache) {
    let index = this.getItemIndex(cache);
    this.dataStore.splice(index, 1);
  }

  /**
   * 清除所有数据
   */
  clear() {
    this.dataStore = [];
  }

  getItemIndex(cache) {
    return this.dataStore.indexOf(cache);
  }

  get last(){
    const lastOne=this.dataStore[this.length - 1];
    return lastOne?this.get(lastOne.name):null;
  }
  get first(){
    const firstOne=this.dataStore[0];
    return firstOne?this.get(firstOne.name):null;
  }

  get length(){
    return this.dataStore.length;
  }

  @deprecated('CacheList','please use prop `last` instead.')
  getLast() {
    return this.last;
  }

  @deprecated('CacheList','please use prop `first` instead.')
  getFirst() {
    return this.first;
  }

  @deprecated('CacheList','please use prop `length` instead.')
  getLength() {
    return this.dataStore.length;
  }
}