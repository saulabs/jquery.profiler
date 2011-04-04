/**
 *  jquery.profiler.js
 *
 *  Copyright 2011 Andrew Okonetchnikov. All rights reserved.
 *  This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-Share Alike 3.0 Unported License</a>.
 * 
 **/

(function($){
  
  /**
   * class Profiler < Object
   * 
   * Use $.profiler to interact with singleton instance of this class.
   * 
   **/
  function Profiler() {
    this._options = {};
    this._profiler = [];
  }
  
  $.extend(Profiler.prototype, {
    
    /**
     * Profiler#lasts(function) -> Function
     * 
     * Taks a function as argument and measures the execution time.
     * Puts result in ms to standard console object.
     * 
     **/
    lasts: function(func, name){
      if(!$.isFunction(func)) return; // Proceed only if func is function
      var t0 = new Date();

      var result = func(); // Execute function

      var t1 = new Date();
      var dt = t1-t0;
      if(typeof console !== 'undefined'){console.log('Executing of ' + (name || func.callee) + ' took ' + dt + 'ms')};
      
      return result;
    },
    
    /**
     * Profiler#time(name) -> null
     * 
     * Simulates console.time call.
     * Use $.debug.profileEnd(name) with the same name as name to put in console time in ms;
     * 
     **/
    time: function(name){
      var t0 = new Date();
      if(typeof name !== 'undefined') // Name is defined, so store time as named item
        this._profiler[name] = t0;
      else // Name is not defined. Use standard stack to store time
        this._profiler.push(t0);
    },
    
    /**
     * Profiler#timeEnd(name) -> null
     * 
     * Simulates console.timeEnd(name).
     * Use along with $.profiler.time(name) to measure time between thoose calls;
     * 
     **/
    timeEnd: function(name){
      var t0,
          t1 = new Date(),
          dt;
          
      if(typeof name !== 'undefined') // Name is defined, so use named item to get t0
        t0 = this._profiler[name];
      else // Name is not defined. Use last item from stack
        t0 = this._profiler.pop();
        
      dt = t1 - t0;
      if(typeof console !== 'undefined'){console.log((name || 'Profiler:') + ' ' + dt + 'ms')};
    }
    
  });
  
  // Singleton interface
  $.profiler = new Profiler();
  
})(jQuery || Zepto);