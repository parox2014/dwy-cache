
declare module dwyCache{

  interface Strategy{
    beforePut();
    afterHit();
    put(cache:CacheModel);
  }
  
  interface CacheModel<T>{
    constructor(name:string,value:T,expire?:number);
    name:string;
    value:T;
    createdAt:number;
    usedAt:number;
    frequency:number;
    expire?:number;
    reset():this;
    increaseFrequency():this;
    updateUsedTime():this;
    isExpired():boolean;
  }
  
  interface Option{
    max?:number;
    strategy?:Strategy;
    expire?:number;
  }

  export class FIFOStrategy implements Strategy{
    beforePut();
    afterHit();
    put(cache:CacheModel);
  }
  
  export class LRUStrategy implements Strategy{
    beforePut();
    afterHit();
    put(cache:CacheModel);
  }
  
  export class LFUStrategy implements Strategy{
    beforePut();
    afterHit();
    put(cache:CacheModel);
  }
  
  export class CacheList{
    private max:number;
    private strategy:Strategy;
    private expire?:number;
    private dataStore:CacheModel[];
    constructor(option?:Option);
    /**
     * Use strategy.when switch strategy,the existed data will be reset
     * @param strategy 
     */
    use(strategy:Strategy):any;

    /**
     * put data to cache list
     * @param name 
     * @param value 
     * @param expire 
     */
    put(name:string,value?:any,expire?:number):any;

    /**
     * Get cache data by name
     * @param name 
     */
    get<T>(name:string):T;

    /**
     * Set the max count of cache data
     * @param newMax 
     */
    setMax(newMax:number):void;

    /**
     * Cleare all data
     */
    clear():void;
    /**
     * @deprecated
     * Get the last cache data
     */
    getLast<T>():T|void;

    /**
     * @deprecated
     * Get the first cache data of cache list
     */
    getFirst<T>():T|void;

    /**
     * @deprecated
     * Get the length of cache list
     */
    getLength():number;

    get last<T>():T|void;
    get first<T>():T|void;
    get length():number;
  }
  export default CacheList
}